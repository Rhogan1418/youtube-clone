import { LitElement, html, css } from 'lit'

export class SearchPage extends LitElement {
  static properties() {
  }

  constructor() {
    super()
  }

  static styles = css`
    :host {
      display: flex;
      margin: auto;
    }
  `;


  render() {
    return html`
      <p>Hello World!</p>
    `
  }
}

window.customElements.define('search-page', SearchPage)
