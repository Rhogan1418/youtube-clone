import { html, css, LitElement } from 'lit';
import HomeIcon from '../../assets/home.svg';
import ShortsIcon from '../../assets/shorts.svg';
import SubscriptionIcon from '../../assets/subscription.svg';

class SideDrawer extends LitElement {
  static properties = {
    toggleDrawer: { type: Boolean }
  }

  static styles = css`
    #container {
      width: fit-content;
      display: flex;
      flex-direction: column;
      gap: 20px;
      background-color: #0f0f0f;
    }

    #container.open {
      width: 200px;
      padding-right: 23px;
      height: 100%;
      display: flex;
      z-index: 10;
    }

    #container.open .icon-with-text {
      display: flex;
      flex-direction: row;
      justify-content: left;
      font-size: 14px;
      padding-left: 21px;
      gap: 20px;
      width: 100%;
    }

    .icon-with-text {
      display: flex;
      flex-direction: column;
      font-size: 10px;
      gap:4px;
      color: #f1f1f1;
      text-decoration: none;
      border-radius: 10px;
      justify-content: center;
      align-items: center;
      padding:10px 0px;
    }

    .icon-with-text:hover {
      background-color: #222222;
    }

    @media (max-width: 760px) {
      #container {
        position: absolute;
        display: none;
      }
    }
  `;      

  constructor() {
    super();
    this.toggleDrawer = false;
  }

  sideDrawerLink = (label, iconSrc, href, ariaLabel) => 
    html`
      <a href=${href} class="icon-with-text" aria-label=${ariaLabel}>
        <img height="24px" src=${iconSrc} alt=""/>
        <div>${label}</div>
      </a>
    `

  render() {
    return html`
      <div id='container' class=${this.toggleDrawer ? 'open' : ''}>
        ${this.sideDrawerLink('Home', HomeIcon, 'https://www.youtube.com', 'Go to YouTube homepage')}
        ${this.sideDrawerLink('Shorts', ShortsIcon, 'https://www.youtube.com/shorts', 'Go to YouTube shorts')}
        ${this.sideDrawerLink('Subscriptions', SubscriptionIcon, 'https://www.youtube.com/feed/subscriptions', 'Go to YouTube subscriptions')}
      </div>
    `;
  }
}

customElements.define('side-drawer', SideDrawer);