import { html, css, LitElement } from 'lit';

class WelcomeMessage extends LitElement {
  static styles = css`
    #head {
      font-size: 24px;
      font-weight: bold;
      color: #f1f1f1;
      padding-bottom: 10px;
    }
    div {
      border: 1px solid #ffffff50;
      background-color: #ffffff09;
      border-radius: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px;
      font-size: 14px;
      text-align: center;

      p {
        padding: 0;
        margin: 0;
        color: #ffffff80;
      }
    }
  `;

 render() {
    return html`
      <div>
        <p id="head">Try Searching to get Started</p>
        <p> Start watching videos to help us build a feed of videos you'll love.</p>
      </div>
    `;
  }
}

customElements.define('welcome-message', WelcomeMessage);