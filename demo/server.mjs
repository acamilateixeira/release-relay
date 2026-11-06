import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { pathToFileURL } from 'node:url';

const runs = Object.freeze([{
  source: 'fixture',
  commit: 'demo-verified-commit',
  workflow: 'Deploy to GitHub Pages',
  conclusion: 'success',
  site: 'https://acamilateixeira.github.io/sorteador-web/',
}, {
  source: 'fixture',
  commit: 'demo-previous-commit',
  workflow: 'Deploy to GitHub Pages',
  conclusion: 'success',
  site: 'https://acamilateixeira.github.io/sorteador-web/',
}]);

const publicFiles = {
  '/': ['text/html; charset=utf-8', 'index.html'],
  '/demo': ['text/html; charset=utf-8', 'index.html'],
  '/app.js': ['text/javascript; charset=utf-8', 'app.js'],
  '/styles.css': ['text/css; charset=utf-8', 'styles.css'],
};

function sendFile(response, status, [type, file]) {
  response.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  response.end(readFileSync(new URL('./public/' + file, import.meta.url)));
}

function send(response, status, data) {
  response.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  response.end(JSON.stringify(data));
}

async function readBody(request) {
  let body = '';
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 4096) return null;
  }
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
}

export function buildDemo() {
  const handoffs = new Map();
  return createServer(async (request, response) => {
    const [path] = request.url.split('?');
    if (request.method === 'GET') {
      const publicFile = Object.hasOwn(publicFiles, path) ? publicFiles[path] : null;
      if (publicFile) return sendFile(response, 200, publicFile);
      const share = /^\/handoff\/([a-f0-9-]+)$/.exec(path);
      if (share) return sendFile(response, handoffs.has(share[1]) ? 200 : 404, publicFiles['/']);
      if (path === '/api/runs') return send(response, 200, { runs });
    }
    if (request.method === 'POST' && path === '/api/handoffs') {
      const review = await readBody(request);
      const run = runs.find((candidate) => candidate.commit === review?.commit);
      if (!run || review.siteVerified !== true) {
        return send(response, 422, { error: 'verified_commit_required' });
      }
      const id = randomUUID();
      const handoff = { id, ...run, siteVerified: true, reviewedAt: new Date().toISOString() };
      handoffs.set(id, handoff);
      return send(response, 201, handoff);
    }
    const match = /^\/api\/handoffs\/([a-f0-9-]+)$/.exec(path);
    const id = match?.[1];
    if (!id || !handoffs.has(id)) return send(response, 404, { error: 'not_found' });
    if (request.method === 'GET') return send(response, 200, handoffs.get(id));
    if (request.method === 'DELETE') {
      handoffs.delete(id);
      return send(response, 200, { revoked: true });
    }
    return send(response, 405, { error: 'method_not_allowed' });
  });
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  buildDemo().listen(4201, '127.0.0.1', () => console.log('Release Relay fixture at http://127.0.0.1:4201'));
}
