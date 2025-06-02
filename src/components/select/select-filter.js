import { html, css, LitElement } from 'lit';

class SelectFilter extends LitElement {
  static properties = {
    options: { type: Array },
    value: { type: String },
  };

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      color: #f1f1f1;
    }

    select {
      background-color: transparent;
      border-radius: 20px;
      border: 1px solid #ffffff80;
      padding: 10px 22px 10px 20px;
      width: 160px;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      color: #f1f1f1;
    }

    .select-wrapper {
      position: relative;
      display: flex;
      width: 200px;      
    }

    .arrow {
      position: absolute;
      top: 50%;
      right: 62px;
      pointer-events: none;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 6px solid #fff;
    }

    label {
      white-space: nowrap
    }
  `;

  constructor() {
    super();
    this.eventName = '';
    this.options = [];
    this.value = '';
  }

  handleChange(event) {
    this.value = event.target.value;

    this.dispatchEvent(new CustomEvent('select-filter-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <label>Sort by:</label>
      <div class="select-wrapper">
        <select .value=${this.value} @change=${this.handleChange}>
          ${this.options.map((option) => html`<option .value=${option.value}>${option.name}</option>`)}
        </select>
        <div class="arrow"></div>
      </div>
    `;
  }
}

customElements.define('select-filter', SelectFilter);