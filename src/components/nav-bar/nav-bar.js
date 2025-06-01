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
    #navbar {
      width: 100%;
      background-color: transparent;
      height: 60px;
      display: flex;
      align-items: center;
    }

    #nav-container {
      display: flex;
      width: 100%;
      padding: 0 10px;
      justify-content: space-between
    }
    
    #nav-end {
      display: flex;
      justify-content: end;
      flex: 1;
      gap: 12px;
    }

    #nav-start {
      gap: 12px;
      display: flex;
      flex: 1;
      align-items: center;
    }

    #nav-middle {
      display: flex;
      width: 100%;
      margin: 0 12px;
      /* flex: 1; */
      justify-content: center;
    }

    a {
		    display: flex;
        text-decoration: none;
        cursor: pointer;
    }

    #mobile-mag  {
      display: none;
    }

    #back-button {
      display: none;
    }

    #arrow {
      font-size: 20px;
    }

    @media (max-width: 600px) {
      #nav-middle {
        display: none;
      }
      #nav-start {
        width:100%;
      }
      #nav-end {
        width: 100%;
        
      }
      #mobile-mag {
        display: block;
      }

      #back-button.active {
        display: block;
      }
      
      #nav-end.hidden {
        display: none;
      }

      .hidden {
        display: none;
      }

      #nav-middle.active {
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
        <div id='nav-container'>
          <div id='nav-start'>
            <round-button id="back-button" class=${navMiddleClass} @click=${this.handleBackClick}><span id="arrow">&#11013;</span></round-button>
            <round-button class=${classes} eventName='nav-hamburger-click'>
                <img height="24px" id="hamburger-menu" src=${hamburgerMenuIcon} />
            </round-button>                
            <a class=${classes} id="https://www.youtube.com">
              <img id="logo" width="93px" height="20px" src=${youtubeLogo} />
            </a>
          </div>
          <div id='nav-middle' class=${navMiddleClass}>
            <search-input></search-input>
          </div>
          <div id='nav-end' class=${classes}>
            <round-button id="mobile-mag" @click=${this.handleSearchButtonClick}><img height="20px" src=${magGlass} /></round-button>
            <a href="https://accounts.google.com">
              <round-button showBorder>
                <img height="24px" id="person-circle-outline" src=${personOutlineIcon} />
                Sign in
              </round-button> 
            </a>
          </div>
        </div>
    </div>`;
  }
}

customElements.define('nav-bar', Navbar);
