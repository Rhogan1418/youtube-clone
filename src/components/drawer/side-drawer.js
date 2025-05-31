import { html, css, LitElement } from 'lit';
import HomeIcon from '../../assets/home.svg';
import ShortsIcon from '../../assets/shorts.svg';
import SubscriptionIcon from '../../assets/subscription.svg';

class SideDrawer extends LitElement {
static properties = {

}

static styles = css`
  :host {
    height: 100vh;
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

  #container {
    width: fit-content;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;      

 render() {
    return html`
        <div id='container'>
          ${this.renderLink('Home', HomeIcon, 'https://www.youtube.com')}
          ${this.renderLink('Shorts', ShortsIcon, 'https://www.youtube.com/shorts')}
          ${this.renderLink('Subscriptions', SubscriptionIcon, 'https://www.youtube.com/feed/subscriptions')}
        </div>
    `;
  }

  renderLink = (label, iconSrc, href) => 
    html`<a href=${href} class="icon-with-text">
        <img height="24px" src=${iconSrc} alt=${label} />
        <div>${label}</div>
      </a>
    `
}

customElements.define('side-drawer', SideDrawer);