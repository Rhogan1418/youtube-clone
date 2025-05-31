import { html, css, LitElement } from 'lit';
import HomeIcon from '../../assets/home.svg';
import ShortsIcon from '../../assets/shorts.svg';
import SubscriptionIcon from '../../assets/subscription.svg';

class SideDrawer extends LitElement {
  static properties = {
    toggleDrawer: { type: Boolean }
  }

  static styles = css`
    :host {
      height: 100vh;
    }

    #container {
      width: fit-content;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    #container.open {
      width: 200px;
      
      .icon-with-text {
        flex-direction: row;
        justify-content: left;
        font-size: 14px;
        padding-left: 21px;
        gap: 20px;
        width: 100%;
      }
    }

    .icon-with-text {
      display: flex;
      flex-direction: column;
      font-size: 10px;
      gap:4px;
      color: #f1f1f1;
      text-decoration: none;
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
      background-color: #ffffff1a;
    }
  `;      

  constructor() {
    super();
    this.toggleDrawer = false;
  }

  renderLink = (label, iconSrc, href) => 
    html`<a href=${href} class="icon-with-text">
            <img height="24px" src=${iconSrc} alt=${label} />
            <div>${label}</div>
        </a>
    `

  render() {
    return html`
      <div id='container' class=${this.toggleDrawer ? 'open' : ''}>
        ${this.renderLink('Home', HomeIcon, 'https://www.youtube.com')}
        ${this.renderLink('Shorts', ShortsIcon, 'https://www.youtube.com/shorts')}
        ${this.renderLink('Subscriptions', SubscriptionIcon, 'https://www.youtube.com/feed/subscriptions')}
      </div>
    `;
  }
}

customElements.define('side-drawer', SideDrawer);