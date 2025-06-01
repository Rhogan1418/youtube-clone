import { html, css, LitElement } from 'lit';

class RoundButton extends LitElement {
    static properties = {
    disabled: {type: Boolean},
    showBorder: { type: Boolean },
    eventName: { type: String },
    width: { type: Number }
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
    
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  constructor() {
    super();
    this.disabled = false;
    this.showBorder = false;
    this.eventName = '';
    this.width = null;
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
  const style = this.width ? `width: ${this.width}px` : '';

    return html`
      <button class=${`${this.showBorder ? 'with-border' : ''}`} style=${style} @click=${this.handleClick} ?disabled=${this.disabled} >
        <slot></slot>
      </button>
    `;
  }
}



customElements.define('round-button', RoundButton);