import assert from 'node:assert/strict';
import { once } from 'node:events';
import { test } from 'node:test';
import { buildDemo } from './server.mjs';

test('the selected commit needs review and the handoff can be revoked', async (t) => {
  const server = buildDemo().listen(0, '127.0.0.1');
  t.after(() => new Promise((resolve) => server.close(resolve)));
  await once(server, 'listening');
  const origin = 'http://127.0.0.1:' + server.address().port;
  const { runs } = await (await fetch(origin + '/api/runs')).json();
  const publish = (commit, siteVerified) => fetch(origin + '/api/handoffs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ commit, siteVerified }),
  });
  assert.equal((await publish(runs[0].commit, false)).status, 422);
  assert.equal((await publish('another-commit', true)).status, 422);
  const response = await publish(runs[0].commit, true);
  assert.equal(response.status, 201);
  const { id } = await response.json();
  const link = origin + '/api/handoffs/' + id;
  assert.equal((await (await fetch(link)).json()).commit, runs[0].commit);
  assert.equal((await fetch(link, { method: 'DELETE' })).status, 200);
  assert.equal((await fetch(link)).status, 404);
});
