class SiteHeader extends HTMLElement {
  connectedCallback() {
    const current = location.pathname.split('/').pop() || 'home.html';

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

    this.innerHTML = `
      <header class="site-header">
        <a class="logo" href="home.html">
          <img src="../static/images/logo.png" alt="Tiny Brains - go to home page">
        </a>
        <nav class="main-nav" aria-label="Main">${navItems}</nav>
        <a class="btn-signup" href="signup.html">Parent sign-up</a>
      </header>`;
  }
}

customElements.define('site-header', SiteHeader);