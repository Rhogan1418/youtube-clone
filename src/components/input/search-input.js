import { html, css, LitElement } from 'lit';
import magGlass from "../../assets/mag-glass.svg"

class SearchInput extends LitElement {
  static properties = {
    query: { type: String },
  };

  static styles = css`
    :host {
      width: 100%;
    }

    input {
      background-color: transparent;
      border: 1px solid #303030;
      border-radius: 40px 0 0 40px;
      width: 100%;
      height: 36px;
      outline: none;
      padding-left: 20px;
      color: #f1f1f1;
      font-size: 16px
    }

    input:focus {
      border-color: #3a66bf
    }

    button {
      background-color: #222222;
      border: 1px solid #303030;
      border-left: none;
      height: 40px;
      width: 60px;
      border-radius: 0 40px 40px 0;
      cursor: pointer;
    }

    #search-wrapper {
      display: flex;
      max-width: 600px;
      margin: 0 auto;
      position: relative;
    }

    .clear-icon {
      position: absolute;
      right: 70px;
      cursor: pointer;
      font-size: 25px;
      color: #ffffff80;
      user-select: none;
    }

    .clear-icon:hover {
      color: #f1f1f1
    }
  `;

  constructor() {
    super();
    this.query = '';
  }

  updateValue(e) {
    this.query = e.target.value;
  }

  clearInput() {
    this.query = '';
  }

  handleSearch() {
    const query = this.query.trim();

    this.dispatchEvent(new CustomEvent('search-click', {
      detail: { query },
      bubbles: true,
      composed: true
    }));
  }

  handleOnKeyDown(event) {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }

  render() {
    return html`
      <div id="search-wrapper">
          <input placeholder="Search" aria-label="Search" .value=${this.query} @input=${this.updateValue} @keydown=${this.handleOnKeyDown}/>
          ${this.query && html`<span class="clear-icon" @click=${this.clearInput}>&#10005;</span>`}
          <button aria-label="Submit search" @click=${this.handleSearch}><img height="20px" src=${magGlass}></button>
      </div>
    `  
  }
}

customElements.define('search-input', SearchInput);