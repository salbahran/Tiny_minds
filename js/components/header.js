class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const current = location.pathname.split('/').pop() || 'home.html';
    const loggedIn = Auth.isLoggedIn();

    const links = [
      { href: 'home.html',     label: 'Home' },
      { href: 'numbers.html',  label: 'Numbers' },
      { href: 'alphabet.html', label: 'Alphabet' },
      { href: 'animals.html',  label: 'Animals' },
    ];

    const navItems = links.map(({ href, label }) => {
      const active = href === current;
      return `<a href="${href}" class="nav-link${active ? ' is-active' : ''}"${active ? ' aria-current="page"' : ''}>${label}</a>`;
    }).join('');

    const action = loggedIn
      ? `<button type="button" class="btn-signup" id="logout-btn">Log out</button>`
      : `<a class="btn-signup" href="home.html#login">Parent sign-up</a>`;

    this.innerHTML = `
      <header class="site-header">
        <a class="logo" href="home.html">
          <img src="../static/images/logo.png" alt="Tiny Brains - go to home page">
        </a>
        <nav class="main-nav" aria-label="Main">${navItems}</nav>
        ${action}
      </header>`;

    this.querySelector('#logout-btn')?.addEventListener('click', () => {
      Auth.logout();
      location.href = 'home.html';
    });
  }
}

customElements.define('site-header', SiteHeader);
