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
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
       :host {
            display: block;
            text-align: center;
            width: 100%;
            background-color: var(--blueCol);
            color: white;
            
          }
          
          div {
          padding: 16px;

        }
        
        span {
          font-size: 12px;
          font-weight: 200;
        }
        span a {
          color: #fff;
        }
        span a:hover {
          color: var(--pinkCol);
        }

        p {
          font-size: 14px;
          font-weight: 200;
          color: #b0b0b0;
        }

    </style>
    <div>
    <p>Copyright © 2022 biuskup.com. All Rights Reserved</p>
    <span>Create with love by <a href="https://www.instagram.com/chuboot.id">chuboot</a></span>
    </div>
    `;
  }
}

customElements.define("app-footer", AppFooter);
