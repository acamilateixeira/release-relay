const main = document.querySelector('#main');

const checklist = [
  'The main page opens',
  'The key user flow works',
  'The mobile layout is readable',
];

function setMain(markup) {
  main.innerHTML = markup;
}

function showLanding() {
  setMain(`
    <section class="hero">
      <div>
        <p class="eyebrow"><span></span> THE CLIENT HANDOFF WORKSPACE</p>
        <h1>Ship with<br><em>proof.</em></h1>
        <p class="lede">One link that shows your client which version you reviewed, what you checked, and what comes next.</p>
        <a class="button primary" href="/demo">Try the demo <span aria-hidden="true">↗</span></a>
        <p class="hint">No account required. The demo uses sample evidence.</p>
      </div>
      <aside class="preview" aria-label="Example delivery">
        <p class="eyebrow">EXAMPLE DELIVERY</p>
        <h2>Sorteador Web</h2>
        <ol class="stages">
          <li><span>01</span><div><strong>Workflow passed</strong><small>GitHub Actions evidence</small></div></li>
          <li><span>02</span><div><strong>Site reviewed</strong><small>Manual checklist for the selected revision</small></div></li>
          <li><span>03</span><div><strong>Handoff ready</strong><small>A client link you can revoke</small></div></li>
        </ol>
      </aside>
    </section>`);
}

async function json(path, options) {
  const result = await fetch(path, options);
  if (!result.ok) {
    const error = new Error('The request could not be completed.');
    error.status = result.status;
    throw error;
  }
  return result.json();
}

async function showDemo() {
  setMain(`
    <section class="screen">
      <p class="eyebrow">DEMO WORKSPACE</p>
      <h1>Review a release</h1>
      <p class="lede">Choose a workflow run, review the site, and share the result.</p>
      <p class="notice">Sample GitHub evidence. Links work while this local server is running.</p>
      <form class="panel" id="review">
        <h2>01 · Workflow run</h2>
        <label for="run">Run to review</label>
        <select id="run" name="run" disabled></select>
        <p class="hint">A successful workflow records a CI result. Check the live site separately.</p>
        <h2>02 · Manual site review</h2>
        <p><a href="https://acamilateixeira.github.io/sorteador-web/" target="_blank" rel="noopener">Open the sample site ↗</a></p>
        <fieldset disabled>
          <legend>Complete the checklist for this run</legend>
          ${checklist.map((label) => `<label class="check"><input type="checkbox" name="check"> ${label}</label>`).join('')}
        </fieldset>
        <h2>03 · Client handoff</h2>
        <button class="primary" type="submit" disabled>Publish sample handoff</button>
        <p id="feedback" role="status"></p>
        <div id="published"></div>
      </form>
    </section>`);

  const form = document.querySelector('#review');
  const select = form.elements.run;
  const checks = [...form.querySelectorAll('[name="check"]')];
  const publish = form.querySelector('button[type="submit"]');
  const feedback = document.querySelector('#feedback');
  const published = document.querySelector('#published');
  const update = () => { publish.disabled = !checks.every((check) => check.checked); };

  try {
    const { runs } = await json('/api/runs');
    for (const run of runs) {
      select.add(new Option(`${run.workflow} · ${run.commit}`, run.commit));
    }
    select.disabled = false;
    form.querySelector('fieldset').disabled = false;
  } catch {
    feedback.textContent = 'The sample could not load. Reload this page to try again.';
    return;
  }

  select.addEventListener('change', () => {
    checks.forEach((check) => { check.checked = false; });
    feedback.textContent = 'Workflow changed. Review the site for this run.';
    update();
  });
  checks.forEach((check) => check.addEventListener('change', update));

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (publish.disabled) return;
    publish.disabled = true;
    select.disabled = true;
    form.querySelector('fieldset').disabled = true;
    feedback.textContent = 'Publishing…';
    try {
      const handoff = await json('/api/handoffs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commit: select.value, siteVerified: true }),
      });
      feedback.textContent = 'The sample handoff is ready.';
      const entry = document.createElement('p');
      entry.className = 'handoff-actions';
      const link = document.createElement('a');
      link.textContent = 'Open client handoff';
      link.href = '/handoff/' + encodeURIComponent(handoff.id);
      link.target = '_blank';
      link.rel = 'noopener';
      const revoke = document.createElement('button');
      revoke.type = 'button';
      revoke.textContent = 'Revoke link';
      revoke.addEventListener('click', async () => {
        revoke.disabled = true;
        try {
          await json('/api/handoffs/' + encodeURIComponent(handoff.id), { method: 'DELETE' });
          entry.remove();
          feedback.textContent = 'The handoff link was revoked.';
        } catch {
          revoke.disabled = false;
          feedback.textContent = 'Revocation failed. Try again.';
        }
      });
      entry.append(link, revoke);
      published.append(entry);
    } catch {
      feedback.textContent = 'The handoff could not be published. Try again.';
    } finally {
      select.disabled = false;
      form.querySelector('fieldset').disabled = false;
      update();
    }
  });
}

async function showHandoff(id) {
  try {
    const handoff = await json('/api/handoffs/' + encodeURIComponent(id));
    setMain(`
      <section class="screen">
        <p class="eyebrow">CLIENT HANDOFF · SAMPLE</p>
        <h1>Sorteador Web</h1>
        <p class="lede">Release review summary</p>
        <div class="panel">
          <dl>
            <dt>Workflow</dt><dd id="workflow"></dd>
            <dt>Reviewed commit</dt><dd><code id="commit"></code></dd>
            <dt>Reviewed at</dt><dd id="date"></dd>
          </dl>
          <h2>What we checked</h2>
          <ul>${checklist.map((label) => `<li>${label}</li>`).join('')}</ul>
          <h2>Next step</h2>
          <p>Open the reviewed site and share any feedback with your project contact.</p>
          <a href="https://acamilateixeira.github.io/sorteador-web/">Open the site ↗</a>
        </div>
      </section>`);
    document.querySelector('#workflow').textContent = handoff.workflow;
    document.querySelector('#commit').textContent = handoff.commit;
    document.querySelector('#date').textContent = new Date(handoff.reviewedAt).toLocaleString();
  } catch (error) {
    const message = error.status === 404
      ? 'This handoff is unavailable.'
      : 'The handoff could not load. Reload this page to try again.';
    const title = document.createElement('h1');
    title.textContent = message;
    main.replaceChildren(title);
  }
}

const path = location.pathname;
if (path === '/demo') showDemo();
else if (path.startsWith('/handoff/')) showHandoff(path.split('/').at(-1));
else showLanding();
