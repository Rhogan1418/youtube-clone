import { html, css, LitElement } from 'lit';

class SearchResultsSkeleton extends LitElement {
  static properties = {
    count: { type: Number },
  };

  static styles = css`
    :host {
      width: 100%;
    }

    .video-container {
      display: flex;
      gap: 16px;
      padding: 24px;
      justify-content: start;
    }

    .video-details div {
      background-color: #ffffff10;
      border-radius: 10px;
    }

    .video-statistics {
      height: 16px;
      width: 60px;
      margin-bottom: 20px;
    }

    .video-description {
      height: 16px;
      width: 400px;
      margin-bottom: 20px;
    }

    .video-title {
      margin: 0;
      margin-bottom: 4px;
      height: 24px;
      width: 200px;
    }

    .img-block {
      height: 180px;
      width: 320px;
      border-radius: 10px;
      background-color: #ffffff10;
    }

     @media (max-width: 760px) {
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-left: 0;

      }
      .video-description {
        display: none;
      }

      .video-container {
        display: flex;
        flex-direction: column;
        max-width: 320px;
        gap: 4px;
      }

    }
  `;

  constructor() {
    super();
    this.count = 10;
  }

  renderSkeletonCard() {
    return html`
      <div class="video-container">
        <div class="img-block"></div>
        <div class="video-details">
          <div class="video-title"></div>
          <div class="video-statistics"></div>
          <div class="video-description"></div>
        </div>
      </div>
    `;
  }

  render() {
    return html`${Array.from({ length: this.count }, () => this.renderSkeletonCard())}`;
  }
}

customElements.define('search-results-skeleton', SearchResultsSkeleton);
