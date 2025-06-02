import { html, css, LitElement } from 'lit';
import hamburgerMenuIcon from '../../assets/hamburger-menu.svg';
import personOutlineIcon from '../../assets/person-circle-outline.svg';
import youtubeLogo from '../../assets/youtube-logo.svg';
import magGlass from "../../assets/mag-glass.svg"
import '../button/round-button.js';
import '../input/search-input.js';

export class Navbar extends LitElement {
  static properties = {
    mobileSearchActive: {type: Boolean},
    showSearch: {type: Boolean}
  };
  
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    #navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      height: 60px;
      background-color: transparent;
    }

    #nav-start,
    #nav-end {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    #nav-end {
      justify-content: end;
    }

    #nav-middle {
      margin: 0 12px;
      width: 100%;
    }

    a {
      display: flex;
      text-decoration: none;
      cursor: pointer;
    }

    #arrow {
      font-size: 20px;
    }

    .hidden {
      display: none !important;
    }

    #back-button, #mobile-mag {
      display: none;
    }

    @media (max-width: 760px) {
      #nav-middle {
        display: none;
      }

      #nav-middle.active, #back-button.active, #mobile-mag {
        display: flex;
      }
    }
  `;

  constructor() {
    super();
    this.showSearch = false;
  }

  handleSearchButtonClick = () => {
    this.showSearch = true;
  }

  handleBackClick = () => {
    this.showSearch = false;
  }

  render() {
    const classes = this.showSearch ? 'hidden' : '';
    const navMiddleClass = this.showSearch ? 'active' : '';
    
    return html`
      <div id='navbar'> 
        <div id='nav-start'>
          <round-button id="back-button" aria-label="Back to main nav" class=${navMiddleClass} @click=${this.handleBackClick}><span id="arrow">&#11013;</span></round-button>
          <round-button class=${classes} aria-label="Open Menu" eventName='nav-hamburger-click'>
              <img height="24px" id="hamburger-menu" src=${hamburgerMenuIcon} />
          </round-button>                
          <a class=${classes} aria-label="Go to YouTube homepage" href="https://www.youtube.com">
            <img id="logo" width="93px" height="20px" src=${youtubeLogo} />
          </a>
        </div>
        <div id='nav-middle' class=${navMiddleClass}>
          <search-input></search-input>
        </div>
        <div id='nav-end' class=${classes}>
          <round-button id="mobile-mag" aria-label="Open Search" @click=${this.handleSearchButtonClick}><img height="20px" src=${magGlass} /></round-button>
          <a href="https://accounts.google.com" aria-label="Go to YouTube sign in page">
            <round-button showBorder>
              <img height="24px" id="person-circle-outline" src=${personOutlineIcon} />
              Sign in
            </round-button> 
          </a>
        </div>
    </div>`;
  }
}

customElements.define('nav-bar', Navbar);
