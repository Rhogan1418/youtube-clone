import { html, css, LitElement } from 'lit';

class SearchResultCard extends LitElement {
  static properties = {
    searchResult: {}
  };

  static styles = css`
    :host {
      padding: 24px;
      display: flex;
      width: 100%;
      max-width: 1024px;
    }

    img {
      border-radius: 10px;
      cursor: pointer;
    }

    .video-container {
      display: flex;
      gap: 16px;
    }

    .video-details {
      div {
        font-size: 12px;
        color: #ffffff95;
        margin-bottom: 20px;
        line-height: 18px
      }
    }

    .video-title {
      margin: 0;
      margin-bottom: 4px;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
    }

    .video-title:hover {
      text-decoration: underline;
    }

    a {
      text-decoration: none;
      color: #ffffff
    }
  `;

  constructor() {
    super();
    this.searchResult = {};
  }

  render() {
    const {videoId, title, commentCount, imageUrl, description} = this.searchResult;

    return html`
      <div class="video-container">
        <a href=${`https://www.youtube.com/watch?v=${videoId}`}>
          <img width="320" height="180" src=${imageUrl}>
        </a>
        <div class="video-details">
          <a href=${`https://www.youtube.com/watch?v=${videoId}`}>
            <h2 class="video-title">${title}</h2>
          </a>
          <div class="video-statistics">${commentCount} ${Number(commentCount) === 1 ? 'Comment' : 'Comments'}</div>
          <div class="video-subtitle">${description}</div>
        </div>
      </div>
    `;
  }
}

customElements.define('search-result-card', SearchResultCard);