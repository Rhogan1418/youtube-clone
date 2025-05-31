import { LitElement, html, css } from 'lit'
import './components/nav-bar/nav-bar.js'

export class SearchPage extends LitElement {
  static properties() {
  }

  constructor() {
    super()
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100vh;
    }

  `;


  render() {
    return html`
      <nav-bar></nav-bar>
    `
  }
}

window.customElements.define('search-page', SearchPage)
