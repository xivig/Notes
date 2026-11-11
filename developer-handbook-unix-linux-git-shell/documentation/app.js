(() => {
  const input = document.querySelector('#doc-search');
  const results = document.querySelector('#search-results');
  const sections = [...document.querySelectorAll('.doc-section, .hero')];
  const nav = [...document.querySelectorAll('.nav-link')];
  const menu = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');

  const closeResults = () => { results.hidden = true; results.innerHTML = ''; };
  const search = (value) => {
    const query = value.trim().toLowerCase();
    if (!query) return closeResults();
    const matches = sections.map(section => {
      const title = section.dataset.title || section.querySelector('h1')?.innerText || '';
      const text = section.innerText.toLowerCase();
      return { id: section.id, title, text, excerpt: section.innerText.replace(/\s+/g, ' ').slice(0, 145) };
    }).filter(item => item.title.toLowerCase().includes(query) || item.text.includes(query)).slice(0, 8);
    results.replaceChildren();
    if (matches.length) {
      matches.forEach(item => {
        const link = document.createElement('a');
        link.href = `#${item.id}`;
        link.append(document.createTextNode(item.title));
        const excerpt = document.createElement('small');
        excerpt.textContent = item.excerpt;
        link.append(excerpt);
        results.append(link);
      });
    } else {
      const empty = document.createElement('div');
      empty.className = 'search-empty';
      empty.textContent = 'No matching guides. Try another keyword.';
      results.append(empty);
    }
    results.hidden = false;
  };

  input.addEventListener('input', () => search(input.value));
  input.addEventListener('keydown', event => {
    if (event.key === 'Escape') { input.value = ''; closeResults(); input.blur(); }
    if (event.key === 'Enter') results.querySelector('a')?.click();
  });
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) { event.preventDefault(); input.focus(); }
    if (event.key === 'Escape') closeResults();
  });
  document.addEventListener('click', event => { if (!results.contains(event.target) && event.target !== input) closeResults(); });
  results.addEventListener('click', () => { closeResults(); sidebar.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      nav.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  sections.forEach(section => observer.observe(section));

  menu.addEventListener('click', () => {
    const open = sidebar.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy.replace(/\\n/g, '\n'));
      button.textContent = 'Copied';
      setTimeout(() => { button.textContent = 'Copy'; }, 1400);
    } catch { button.textContent = 'Select code'; }
  }));
})();
