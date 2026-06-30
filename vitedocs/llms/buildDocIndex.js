import path from 'path';
import { ROOT } from './utils.js';
import { parseRoutes } from './parseRoutes.js';
import {
  extractMarkdownFromJsx,
  readMarkdownFile
} from './extractMarkdown.js';

const SPECIAL_SOURCES = {
  'getting-started/readme': path.join(ROOT, 'README.md'),
  'getting-started/changelog': path.join(ROOT, 'CHANGELOG.md')
};

function titleFromMarkdown(content, fallback) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

function titleFromPath(routePath) {
  const segment = routePath.split('/').pop() || routePath;
  return segment
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function buildDocIndex() {
  const routes = parseRoutes();
  const markdown = {};
  const entries = [];

  for (const route of routes) {
    let content = null;
    const specialFile = SPECIAL_SOURCES[route.path];

    if (specialFile) {
      content = readMarkdownFile(specialFile);
    } else if (route.sourceFile) {
      content = extractMarkdownFromJsx(route.sourceFile);
    }

    if (!content) continue;

    markdown[route.path] = content;
    entries.push({
      path: route.path,
      title: titleFromMarkdown(content, titleFromPath(route.path)),
      component: route.component
    });
  }

  return { markdown, entries };
}
