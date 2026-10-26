class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-about">
            <p class="footer-tagline">Playful learning for little explorers.</p>
            <p class="footer-sub">Discover letters, numbers and animals.</p>
          </div>

          <nav class="footer-col footer-nav" aria-label="Footer">
            <a href="home.html">Home</a>
            <a href="numbers.html">Numbers</a>
            <a href="alphabet.html">Alphabet</a>
            <a href="animals.html">Animals</a>
          </nav>

          <nav class="footer-col footer-docs" aria-label="Project documentation">
            <p class="footer-docs-title">
              <img src="../static/images/star.png" alt="">
              Documentation
            </p>
            <a href="overview.html">Overview</a>
            <a href="planning-design.html">Planning &amp; design</a>
            <a href="reflection-ai-report.html">Reflection &amp; AI report</a>
          </nav>
        </div>

        <div class="footer-garden" aria-hidden="true"></div>
      </footer>`;
  }
}

customElements.define('site-footer', SiteFooter);