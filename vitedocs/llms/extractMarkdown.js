import fs from 'fs';
import parse from '@babel/parser';
import _traverse from '@babel/traverse';
import { resolveImport } from './utils.js';

const traverse = _traverse.default || _traverse;

function collectRawImports(ast, filePath) {
  const rawImports = {};
  traverse(ast, {
    ImportDeclaration(nodePath) {
      const source = nodePath.node.source.value;
      if (!source.endsWith('?raw')) return;
      const binding = nodePath.node.specifiers[0]?.local?.name;
      if (!binding) return;
      const resolved = resolveImport(filePath, source.replace('?raw', ''));
      if (fs.existsSync(resolved)) {
        rawImports[binding] = fs.readFileSync(resolved, 'utf8');
      }
    }
  });
  return rawImports;
}

function getJsxAttrValue(attr, rawImports) {
  if (!attr?.value) return null;
  if (attr.value.type === 'StringLiteral') return attr.value.value;
  if (attr.value.type === 'Literal') return attr.value.value;
  if (attr.value.type === 'JSXExpressionContainer') {
    const expr = attr.value.expression;
    if (expr.type === 'StringLiteral' || expr.type === 'Literal') {
      return expr.value;
    }
    if (expr.type === 'Identifier' && rawImports[expr.name]) {
      return { type: 'raw', content: rawImports[expr.name] };
    }
    if (expr.type === 'TemplateLiteral' && expr.expressions.length === 0) {
      return expr.quasis.map(q => q.value.cooked).join('');
    }
  }
  return null;
}

function jsxChildrenToText(children, rawImports) {
  const parts = [];
  for (const child of children) {
    if (child.type === 'JSXText') {
      const text = child.value.replace(/\s+/g, ' ').trim();
      if (text) parts.push(text);
    } else if (child.type === 'JSXExpressionContainer') {
      const expr = child.expression;
      if (expr.type === 'StringLiteral' || expr.type === 'Literal') {
        parts.push(String(expr.value));
      }
    } else if (child.type === 'JSXElement') {
      parts.push(jsxElementToInline(child, rawImports));
    }
  }
  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

function jsxElementToInline(node, rawImports) {
  const name = node.openingElement.name.name;
  const children = jsxChildrenToText(node.children, rawImports);

  if (name === 'br') return '\n';
  if (name === 'code') return children ? `\`${children}\`` : '';
  if (name === 'strong' || name === 'b') return children ? `**${children}**` : '';
  if (name === 'em' || name === 'i') return children ? `*${children}*` : '';
  if (name === 'a') {
    const href = getJsxAttrValue(
      node.openingElement.attributes.find(a => a.name?.name === 'href'),
      rawImports
    );
    return href && children ? `[${children}](${href})` : children;
  }
  if (name === 'Link') {
    const href = getJsxAttrValue(
      node.openingElement.attributes.find(a => a.name?.name === 'href'),
      rawImports
    );
    return href && children ? `[${children}](${href})` : children;
  }
  if (name === 'li') return children ? `- ${children}` : '';
  return children;
}

function jsxElementToBlock(node, rawImports, usedRaw) {
  const name = node.openingElement.name.name;

  if (name === 'hr') return '---';
  if (name === 'h1') {
    const text = jsxChildrenToText(node.children, rawImports);
    return text ? `# ${text}` : null;
  }
  if (name === 'h2') {
    const text = jsxChildrenToText(node.children, rawImports);
    return text ? `## ${text}` : null;
  }
  if (name === 'h3') {
    const text = jsxChildrenToText(node.children, rawImports);
    return text ? `### ${text}` : null;
  }
  if (name === 'h4') {
    const text = jsxChildrenToText(node.children, rawImports);
    return text ? `#### ${text}` : null;
  }
  if (name === 'Info' || name === 'p') {
    const text = jsxChildrenToText(node.children, rawImports);
    return text || null;
  }
  if (name === 'ul' || name === 'ol') {
    const items = node.children
      .filter(c => c.type === 'JSXElement' && c.openingElement.name.name === 'li')
      .map(li => jsxChildrenToText(li.children, rawImports))
      .filter(Boolean)
      .map(text => `- ${text}`);
    return items.length ? items.join('\n') : null;
  }
  if (name === 'Code') {
    const childText = jsxChildrenToText(node.children, rawImports);
    if (childText) {
      return `\`\`\`jsx\n${childText}\n\`\`\``;
    }
    for (const attr of node.openingElement.attributes) {
      const value = getJsxAttrValue(attr, rawImports);
      if (value?.type === 'raw') {
        usedRaw.add(attr.name.name);
        const lang = attr.name.name.includes('input') ? 'jsx' : 'jsx';
        return `\`\`\`${lang}\n${value.content.trim()}\n\`\`\``;
      }
    }
    for (const attr of node.openingElement.attributes) {
      const attrName = attr.name?.name;
      if (attrName?.startsWith('input') || attrName === 'children') {
        const value = getJsxAttrValue(attr, rawImports);
        if (typeof value === 'string' && value.trim()) {
          return `\`\`\`jsx\n${value.trim()}\n\`\`\``;
        }
      }
    }
    return null;
  }
  if (name === 'SideBySide') {
    for (const attr of node.openingElement.attributes) {
      const value = getJsxAttrValue(attr, rawImports);
      if (value?.type === 'raw') {
        usedRaw.add(attr.name.name);
        return `\`\`\`jsx\n${value.content.trim()}\n\`\`\``;
      }
    }
    for (const attr of node.openingElement.attributes) {
      if (attr.name?.name === 'right') {
        const expr = attr.value?.expression;
        if (expr?.type === 'JSXElement' && expr.openingElement.name.name === 'Code') {
          return jsxElementToBlock(expr, rawImports, usedRaw);
        }
      }
    }
    return null;
  }
  return null;
}

function walkJsx(node, rawImports, lines, usedRaw) {
  if (node.type === 'JSXElement') {
    const block = jsxElementToBlock(node, rawImports, usedRaw);
    if (block) {
      lines.push(block);
      return;
    }
    for (const child of node.children) {
      walkJsx(child, rawImports, lines, usedRaw);
    }
  } else if (node.type === 'JSXFragment') {
    for (const child of node.children) {
      walkJsx(child, rawImports, lines, usedRaw);
    }
  }
}

export function extractMarkdownFromJsx(filePath) {
  if (!filePath || !fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, 'utf8');
  const ast = parse.parse(source, { sourceType: 'module', plugins: ['jsx'] });
  const rawImports = collectRawImports(ast, filePath);
  const lines = [];
  const usedRaw = new Set();

  const walkReturn = node => {
    if (!node) return;
    if (node.type === 'ReturnStatement') {
      walkJsx(node.argument, rawImports, lines, usedRaw);
      return;
    }
    if (node.body?.body) {
      for (const stmt of node.body.body) {
        walkReturn(stmt);
      }
    }
  };

  traverse(ast, {
    ExportDefaultDeclaration(nodePath) {
      walkReturn(nodePath.node.declaration);
    },
    FunctionDeclaration(nodePath) {
      if (nodePath.node.id?.name) {
        walkReturn(nodePath.node.body);
      }
    }
  });

  for (const [name, content] of Object.entries(rawImports)) {
    if (!usedRaw.has(name)) {
      lines.push(`\`\`\`jsx\n${content.trim()}\n\`\`\``);
    }
  }

  return lines.filter(Boolean).join('\n\n').trim() || null;
}

export function readMarkdownFile(filePath) {
  if (!filePath || !fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf8').trim();
}
