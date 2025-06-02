import { html, css, LitElement } from 'lit';

class ErrorBanner extends LitElement {
  static styles = css`
    :host {
      width: 100%;
    }
    div {
      font-size: 14px;
      padding: 16px;
      border: 1px solid #ffffff20;
      background-color: #222222;
      border-radius: 14px;
      text-align: center;
      margin: 0 20px 20px 20px
    }
    @media (max-width: 760px) {
      :host {
        margin: auto;
      }
      div {
        display: flex;
        max-width: 320px;
        margin: 0;
        margin: 0 auto 20px auto;
      }
    }
  `;

  render() {
    return html`
        <div>
            <slot></slot>
        </div>
    `;
  }
}

customElements.define('error-banner', ErrorBanner);