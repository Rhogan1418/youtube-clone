import { html, css, LitElement } from 'lit';
import { Task } from '@lit/task';
import {mapSearchResultsToStats, getVideoIds} from '../../helpers/search-results.helper.js';
import {getSearchResults, getVideoStatisticResults} from '../../services/youtube-api.js';

import './welcome-message.js';
import './search-result-card.js';
import '../select/select-filter.js';
import './search-results-skeleton.js';
import '../pagination/pagination-section.js';

const SORT_OPTIONS = [
  { name: 'Relevance', value: 'relevance' },
  { name: 'Upload Date', value: 'date' },
  { name: 'Rating', value: 'rating' },
];

class SearchResultsContainer extends LitElement {
  static properties = {
    query: {type: String},
    sortBy: {type: String},
    totalPages: { type: String },
    pageToken: { type: String },
    currentPageNumber: {type: Number},
    showPagination: {type: Boolean}
  }

  static styles = css`
      :host {
      display: flex;
      justify-content: center;
      margin: 0 auto;
      max-width: 1240px;
      padding: 20px;
      width: 100%;
      }

      #search-results {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      #search-results-container {
        display: flex;
        flex-direction: column;
        align-items: end;
        width: 100%;
      }

      p {
        text-align: center;
      }
  `

  constructor() {
    super();
    this.query = '';
    this.sortBy = 'relevance';
    this.options = SORT_OPTIONS;
    this.showPagination = false;

    this.pageToken = '';
    this.totalPages = '';
    this.nextPageToken = null;
    this.prevPageToken = null;
    this.currentPageNumber = 1;
  
    this.addEventListener('select-filter-change', this.handleSortByChange);
    this.addEventListener('prev-click', this.handlePrevPage);
    this.addEventListener('next-click', this.handleNextPage);
  }

  searchTask = new Task(this, {
    task: async ([query, sortBy, pageToken], { signal }) => {
      if (!query) return;
      const searchResults = await getSearchResults(query, sortBy, pageToken, signal);
      if (!searchResults) return
      const videoStatResults = await getVideoStatisticResults(getVideoIds(searchResults.items), signal);
      return mapSearchResultsToStats(searchResults, videoStatResults);
    },
    args: () => [this.query, this.sortBy, this.pageToken],
    onComplete: (result) => {
      this.nextPageToken = result.nextPageToken;
      this.prevPageToken = result.prevPageToken;
      this.totalPages = result.totalPages;
      this.showPagination = true;
    }
  })

  renderSearchResults = (searchResults) => {
    if (searchResults.items.length === 0) {
      return html`<p>We were unable to find any videos for "${this.query}"</p>`;
    }

    return html`
      ${searchResults.items.map(
        (searchResult) => html`<search-result-card .searchResult=${searchResult}></search-result-card>`
      )}
    `;
  }

  handleNextPage = () => {
    if (this.nextPageToken) {
      this.pageToken = this.nextPageToken;
      this.currentPageNumber += 1;
      this.scrollToTop();
    }
  };

  handlePrevPage = () => {
    if (this.prevPageToken) {
      this.pageToken = this.prevPageToken;
      this.currentPageNumber -= 1;
      this.scrollToTop();
    }
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  handleSortByChange = (e) => {
    this.sortBy = e.detail.value;
  }

  handleSearchError = (reasons) => {
    this.showPagination = false;
    if (reasons.includes('quotaExceeded')) {
      return html`<p>YouTube API quota exceeded. Please try again later.</p>`;
    } else if (reasons.includes('API_KEY_INVALID')) {
      return html`<p>It looks like there is an issue with your API key. Either it is invalid or it was never added to the environment.</p>`;
    }
    return html`<p>Something went wrong. Try again soon.</p>`;
  };

  render() {
      if (!this.query) {
        return html`<welcome-message></welcome-message>`;
      }

      return html`<div id="search-results-container">
                    <select-filter .options=${this.options}></select-filter>
                    <div id="search-results">
                      ${this.searchTask.render({
                        pending: () => html`<search-results-skeleton count="5"></search-results-skeleton>`,
                        complete: this.renderSearchResults,
                        error: this.handleSearchError
                      })}
                      </div>
                      ${this.showPagination ? html`
                        <pagination-section 
                          .currentPageNumber=${this.currentPageNumber} 
                          .totalPages=${this.totalPages} 
                          .hasPrevPage=${!!this.prevPageToken} 
                          .hasNextPage=${!!this.nextPageToken}>
                        </pagination-section>
                      ` : null}
                  </div>
      `
    }
}

customElements.define('search-results-container', SearchResultsContainer);