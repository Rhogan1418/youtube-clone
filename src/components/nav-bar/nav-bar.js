import { html, css, LitElement } from 'lit';
import hamburgerMenuIcon from '../../assets/hamburger-menu.svg';
import personOutlineIcon from '../../assets/person-circle-outline.svg';
import youtubeLogo from '../../assets/youtube-logo.svg';
import '../button/round-button.js';
import '../input/search-input.js';

export class Navbar extends LitElement {

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

      div {
        display: flex;
        align-items: center;
        gap: 12px;
      }
    }
    #nav-end {
      justify-content: end;
      width: 15%;
    }

    #nav-start {
      width: 15%;
	  
    }

    #nav-middle {
      width: 70%;
      justify-content: center;
    }

    a {
		display: flex;
        text-decoration: none;
    }
  `;

  render() {
    return html`
      <div id='navbar'> 
        <div id='nav-container'>
          <div id='nav-start'>
            <round-button>
                <img height="24px" id="hamburger-menu" src=${hamburgerMenuIcon} />
            </round-button>                
            <a href="https://www.youtube.com">
              <img id="logo" width="93px" height="20px" src=${youtubeLogo} />
            </a>
          </div>
          <div id='nav-middle'>
            <search-input></search-input>
          </div>
          <div id='nav-end'>
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
