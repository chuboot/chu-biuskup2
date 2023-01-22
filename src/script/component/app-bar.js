class AppBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
    * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
    }

    :host {
        display: flex;
        
        margin: 0 auto;
        overflow-x: hidden;
        justify-content: center;
    }

    .brand-logo {
    font-family: "Lalezar", sans-serif;
    font-size: 45px;
    }
    .brand-logo a {
    color: #fff;
    text-decoration: none;
    }
    .brand-logo a:hover {
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.22);
    }
    </style>
    <div class="brand-logo"><a href="">biuskup</a></div>
    `;
  }
}

customElements.define("app-bar", AppBar);
