async function loadItems() {
  const app = document.getElementById('app');
  try {
    const res = await fetch('/api/items');
    if (!res.ok) {
      const data = await res.json();
      app.innerHTML = `<p>Erreur : ${data.error ?? res.statusText}</p>`;
      return;
    }
    const items = await res.json();
    if (items.length === 0) {
      app.innerHTML = '<p>Aucun item.</p>';
      return;
    }
    const ul = document.createElement('ul');
    for (const item of items) {
      const li = document.createElement('li');
      li.dataset.id = item.id;
      li.textContent = `${item.name} `;
      const btn = document.createElement('button');
      btn.textContent = 'Supprimer';
      btn.dataset.id = item.id;
      li.appendChild(btn);
      ul.appendChild(li);
    }
    app.innerHTML = '';
    app.appendChild(ul);
  } catch (err) {
    app.innerHTML = `<p>Erreur réseau : ${err.message}</p>`;
  }
}

document.getElementById('create-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const name = form.elements['name'].value.trim();
  if (!name) return;
  try {
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      const data = await res.json();
      document.getElementById('app').innerHTML = `<p>Erreur : ${data.error ?? res.statusText}</p>`;
      return;
    }
    form.reset();
    await loadItems();
  } catch (err) {
    document.getElementById('app').innerHTML = `<p>Erreur réseau : ${err.message}</p>`;
  }
});

document.getElementById('app').addEventListener('click', async (e) => {
  const btn = e.target;
  if (btn.tagName !== 'BUTTON' || !btn.dataset.id) return;
  const id = btn.dataset.id;
  try {
    const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
    if (!res.ok && res.status !== 204) {
      const data = await res.json();
      document.getElementById('app').innerHTML = `<p>Erreur : ${data.error ?? res.statusText}</p>`;
      return;
    }
    await loadItems();
  } catch (err) {
    document.getElementById('app').innerHTML = `<p>Erreur réseau : ${err.message}</p>`;
  }
});

loadItems();
