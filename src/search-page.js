import { LitElement, html, css } from 'lit'
import './components/nav-bar/nav-bar.js'
import './components/search-results/search-results-container.js'
export class SearchPage extends LitElement {
  static properties() {
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100vh;
      background-color: #0f0f0f;
    }
  `;

   constructor() {
    super()
  }

  render() {
    return html`
      <nav-bar></nav-bar>
      <search-results-container></search-results-container>
    `
  }
}

window.customElements.define('search-page', SearchPage)
