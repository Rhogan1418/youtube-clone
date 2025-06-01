import { html, css, LitElement } from 'lit';
import '../button/round-button.js'

class PaginationSection extends LitElement {
  static properties = {
    currentPageNumber: {type: Number},
    totalPages: { type: Number },
    hasNextPage: { type: Boolean },
    hasPrevPage: { type: Boolean }
  };

  static styles = css`
    :host {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `;

  constructor() {
    super();
    this.totalPage = 1;
    this.currentPageNumber = 1;
    this.hasPrevPage = false;
    this.hasNextPage = false;
  }

  render() {
    return html`
        <round-button
          ?disabled=${!this.hasPrevPage} 
          showBorder width=${100} 
          eventName="prev-click"
          aria-label="Previous page"
        >
          Previous
        </round-button>
        <p>Page ${this.currentPageNumber} of ${this.totalPages}</p>
        <round-button 
          ?disabled=${!this.hasNextPage} 
          showBorder 
          width=${100} 
          eventName="next-click"
          aria-label="Next page"
        >
          Next
        </round-button>
    `;
  }
}

customElements.define('pagination-section', PaginationSection);



  