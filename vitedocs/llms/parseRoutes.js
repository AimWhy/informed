import fs from 'fs';
import parse from '@babel/parser';
import _traverse from '@babel/traverse';
import { ROUTES_FILE, getElementName, resolveImport } from './utils.js';

const traverse = _traverse.default || _traverse;

const SKIP_ROUTES = new Set(['/', 'playground', 'home', 'unauthorized']);

function getStringAttr(attributes, attrName) {
  const attr = attributes.find(a => a.name?.name === attrName);
  if (!attr?.value) return null;
  if (attr.value.type === 'StringLiteral') return attr.value.value;
  if (attr.value.type === 'Literal') return attr.value.value;
  return null;
}

function getElementComponent(attributes) {
  const elementAttr = attributes.find(a => a.name?.name === 'element');
  if (!elementAttr?.value?.expression) return null;
  const expr = elementAttr.value.expression;
  if (expr.type === 'JSXElement') {
    return getElementName(expr.openingElement.name);
  }
  return null;
}

function walkRoute(node, prefix, routes) {
  if (node.type !== 'JSXElement') return;
  if (getElementName(node.openingElement.name) !== 'Route') return;

  const routePath = getStringAttr(node.openingElement.attributes, 'path');
  const component = getElementComponent(node.openingElement.attributes);
  const fullPath = routePath
    ? prefix
      ? `${prefix}/${routePath}`
      : routePath
    : prefix;

  if (routePath && component && !SKIP_ROUTES.has(fullPath) && routePath !== '*') {
    routes.push({ path: fullPath, component });
  }

  for (const child of node.children) {
    if (child.type === 'JSXElement') {
      walkRoute(child, fullPath || prefix, routes);
    }
  }
}

function parseImports(ast) {
  const imports = {};
  traverse(ast, {
    ImportDeclaration(nodePath) {
      const source = nodePath.node.source.value;
      for (const spec of nodePath.node.specifiers) {
        if (spec.type === 'ImportDefaultSpecifier') {
          imports[spec.local.name] = { source, named: false };
        } else if (spec.type === 'ImportSpecifier') {
          imports[spec.local.name] = { source, named: true };
        }
      }
    }
  });
  return imports;
}

export function parseRoutes() {
  const source = fs.readFileSync(ROUTES_FILE, 'utf8');
  const ast = parse.parse(source, { sourceType: 'module', plugins: ['jsx'] });
  const imports = parseImports(ast);
  const routes = [];

  traverse(ast, {
    JSXElement(nodePath) {
      if (getElementName(nodePath.node.openingElement.name) !== 'RouterRoutes') {
        return;
      }
      for (const child of nodePath.node.children) {
        if (child.type === 'JSXElement') {
          walkRoute(child, '', routes);
        }
      }
    }
  });

  const seen = new Set();
  return routes
    .filter(route => {
      if (seen.has(route.path)) return false;
      seen.add(route.path);
      return true;
    })
    .map(route => {
      const imp = imports[route.component];
      if (!imp) {
        return { ...route, sourceFile: null };
      }
      return {
        ...route,
        sourceFile: resolveImport(ROUTES_FILE, imp.source.replace(/\?raw$/, ''))
      };
    });
}
