import { html, css, LitElement } from 'lit';
import hamburgerMenuIcon from '../../assets/hamburger-menu.svg';
import personOutlineIcon from '../../assets/person-circle-outline.svg';
import youtubeLogo from '../../assets/youtube-logo.svg';


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
      padding: 0 12px;

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
        text-decoration: none;
    }

    button {
      background-color: transparent;
      color: #f1f1f1;
      border: 1px solid transparent;
      padding: 0.5rem;
      border-radius: 40px;
      height: 40px;
      min-width: 40px;
      cursor: pointer;
      gap: 0.5rem; 
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;

  render() {
    return html`
      <div id='navbar'> 
        <div id='nav-container'>
          <div id='nav-start'>
            <button>
                <img height="24px" id="hamburger-menu" src=${hamburgerMenuIcon} />
            </button>                
            <a href="https://www.youtube.com">
              <img id="logo" width="93px" height="20px" src=${youtubeLogo} />
            </a>
          </div>
          <div id='nav-middle'>
            Search Input Here
          </div>
          <div id='nav-end'>
            <a href="https://accounts.google.com">
              <button>
                <img height="24px" id="person-circle-outline" src=${personOutlineIcon} />
                Sign in
              </button> 
            </a>
          </div>
        </div>
    </div>`;
  }
}

customElements.define('nav-bar', Navbar);
