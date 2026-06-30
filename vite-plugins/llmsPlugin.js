import fs from 'fs';
import path from 'path';
import { buildDocIndex } from '../vitedocs/llms/buildDocIndex.js';
import { generateLlmsTxt } from '../vitedocs/llms/generateLlmsTxt.js';
import { normalizeDocPath } from '../vitedocs/llms/utils.js';

export function llmsPlugin() {
  let docIndex = null;

  const getIndex = () => {
    if (!docIndex) {
      docIndex = buildDocIndex();
    }
    return docIndex;
  };

  const sendMarkdown = (res, content) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.end(content);
  };

  const sendLlmsTxt = (res, content) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end(content);
  };

  const handleRequest = (req, res, next) => {
    const url = req.url || '';

    // Let Vite resolve ?raw / ?import module requests (e.g. CHANGELOG.md?import&raw)
    if (url.includes('import') || url.includes('raw')) {
      return next();
    }

    const urlPath = url.split('?')[0];

    if (urlPath.endsWith('/llms.txt') || urlPath === '/llms.txt') {
      sendLlmsTxt(res, generateLlmsTxt(getIndex()));
      return;
    }

    if (urlPath.endsWith('.md')) {
      const routePath = normalizeDocPath(urlPath);
      const content = getIndex().markdown[routePath];
      if (content) {
        sendMarkdown(res, content);
        return;
      }
      return next();
    }

    next();
  };

  return {
    name: 'informed-llms',
    configureServer(server) {
      return () => {
        server.middlewares.use(handleRequest);
      };
    },
    configurePreviewServer(server) {
      return () => {
        server.middlewares.use(handleRequest);
      };
    },
    buildStart() {
      docIndex = buildDocIndex();
    },
    closeBundle() {
      const index = getIndex();
      const outDir = path.resolve('docs');

      for (const [routePath, content] of Object.entries(index.markdown)) {
        const filePath = path.join(outDir, `${routePath}.md`);
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, content);
      }

      fs.writeFileSync(path.join(outDir, 'llms.txt'), generateLlmsTxt(index));

      // Prevent GitHub Pages Jekyll from compiling route-named .md files into
      // HTML pages that shadow SPA routes (e.g. getting-started/intro.md → /intro).
      fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
    }
  };
}
