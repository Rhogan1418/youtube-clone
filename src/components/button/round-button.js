import { html, css, LitElement } from 'lit';

class RoundButton extends LitElement {
    static properties = {
    showBorder: { type: Boolean },
    eventName: { type: String },
  };

  static styles = css`
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
    button.with-border {
      border-color: #ffffff50;
    }
    button:hover {
      background-color: #ffffff1a;
      border-color: #ffffff10;
    }
  `;

  constructor() {
    super();
    this.showBorder = false;
    this.eventName = '';
  }

  handleClick() {
    this.dispatchEvent(
      new CustomEvent(this.eventName, {
        bubbles: true,
        composed: true,
      })
    );
  }

 render() {
    const classes = this.showBorder ? 'with-border' : '';

    return html`
      <button class=${classes} @click=${this.handleClick}>
        <slot></slot>
      </button>
    `;
  }
}



customElements.define('round-button', RoundButton);