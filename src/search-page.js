import { LitElement, html, css } from 'lit';
import './components/nav-bar/nav-bar.js';
import './components/search-results/search-results-container.js';
import './components/drawer/side-drawer.js';

export class SearchPage extends LitElement {
  static properties = {
    toggleDrawer: { type: Boolean }
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100vh;
      background-color: #0f0f0f;
      padding: 0 4px;
    }

    #page-content {
      display: flex;
    }
  `;

   constructor() {
    super()
    this.toggleDrawer = false;
    this.addEventListener('nav-hamburger-click', this.handleHamburgerClick);
  }

   handleHamburgerClick(e) {
    this.toggleDrawer = !this.toggleDrawer;
  }

  render() {
    return html`
      <nav-bar></nav-bar>
      <div id="page-content">
        <side-drawer .toggleDrawer=${this.toggleDrawer}></side-drawer>
        <search-results-container></search-results-container>
      </div>
    `
  }
}

window.customElements.define('search-page', SearchPage)
