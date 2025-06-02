import { LitElement, html, css } from 'lit';
import './components/nav-bar/nav-bar.js';
import './components/search-results/search-results-container.js';
import './components/drawer/side-drawer.js';

export class SearchPage extends LitElement {
  static properties = {
    toggleDrawer: { type: Boolean },
    query: { type: String },
  }

  static styles = css`
    :host {
      width: 100%;
      padding: 0 4px;
      height: 100vh;
    }

    #page-content {
      display: flex;
    }
  `;

  constructor() {
    super()
    this.toggleDrawer = false;
    this.query = '';
    this.addEventListener('nav-hamburger-click', this.handleHamburgerClick);
    this.addEventListener('search-click', this.handleSearchClick);
  }

  handleHamburgerClick() {
    this.toggleDrawer = !this.toggleDrawer;
  }

  handleSearchClick(e) {
    this.query = e.detail.query;
  }

  render() {
    return html`
      <nav-bar></nav-bar>
      <div id="page-content">
        <side-drawer .toggleDrawer=${this.toggleDrawer}></side-drawer>
        <search-results-container .query=${this.query}></search-results-container>
      </div>
    `
  }
}

window.customElements.define('search-page', SearchPage)
