import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, '../..');
export const ROUTES_FILE = path.resolve(__dirname, '../Routes/Routes.jsx');

export function resolveImport(fromFile, importPath) {
  const base = path.resolve(path.dirname(fromFile), importPath);
  for (const ext of ['.jsx', '.js', '.tsx', '.ts', '.md']) {
    const candidate = base + ext;
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  if (fs.existsSync(base) && fs.statSync(base).isDirectory()) {
    for (const indexName of ['index.jsx', 'index.js', 'index.tsx', 'index.ts']) {
      const candidate = path.join(base, indexName);
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        return candidate;
      }
    }
  }
  return base;
}

export function getElementName(nameNode) {
  if (!nameNode) return null;
  if (nameNode.type === 'JSXIdentifier') return nameNode.name;
  if (nameNode.type === 'JSXMemberExpression') {
    return `${getElementName(nameNode.object)}.${getElementName(nameNode.property)}`;
  }
  return null;
}

export function normalizeDocPath(urlPath) {
  let p = urlPath.split('?')[0];
  if (p.endsWith('/')) p = p.slice(0, -1);
  if (p.endsWith('.md')) p = p.slice(0, -3);
  if (p.startsWith('/informed')) p = p.slice('/informed'.length);
  if (p.startsWith('/')) p = p.slice(1);
  return p;
}
