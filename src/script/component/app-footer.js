class AppFooter extends HTMLElement {
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
       :host {
            display: block;
            text-align: center;
            width: 100%;
            background-color: var(--blueCol);
            color: white;
        }
        
        h2 {
            padding: 16px;
        }

    </style>
    <h2>biuskup.com</h2>`;
  }
}

customElements.define("app-footer", AppFooter);
