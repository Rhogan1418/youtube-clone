import { html, css, LitElement } from 'lit';
import { Task } from '@lit/task';
import {mapSearchResultsToStats, getVideoIds} from '../../helpers/search-results.helper.js';
import {getSearchResults, getVideoStatisticResults} from '../../services/youtube-api.js';

import '../banner/error-banner.js'
import './search-result-card.js';
import './search-results-skeleton.js';
import './welcome-message.js';

import '../pagination/pagination-section.js';
import '../select/select-filter.js';


const SORT_OPTIONS = [
  { name: 'Relevance', value: 'relevance' },
  { name: 'Upload Date', value: 'date' },
  { name: 'Rating', value: 'rating' },
];

class SearchResultsContainer extends LitElement {
  static properties = {
    query: { type: String },
    sortBy: { type: String },
    totalPages: { type: String },
    pageToken: { type: String },
    currentPageNumber: { type: Number },
    showPagination: { type: Boolean },
    showSortBy: { type: Boolean },
    errorMessage: { type: String }
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
    this.showSortBy = false;
    this.errorMessage = '';

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
      try {
        const searchResults = await getSearchResults(query, sortBy, pageToken, signal);
        if (!searchResults) return
        const videoStatResults = await getVideoStatisticResults(getVideoIds(searchResults.items), signal);
        return mapSearchResultsToStats(searchResults, videoStatResults);
      } catch (err) {
        this.handleError(err);
        return null;
      }
    },
    args: () => [this.query, this.sortBy, this.pageToken],
    onComplete: (result) => {
      if (!result) {
        return;
      }

      if (result.isMockData) {
        this.errorMessage = 'This is MOCK DATA! We could not locate your API key. For instructions on adding your API key, please check out the README.';
      } else {
        this.errorMessage = '';
      }

      this.isMockData = result.isMockData;
      this.nextPageToken = result.nextPageToken;
      this.prevPageToken = result.prevPageToken;
      this.totalPages = result.totalPages;
      this.showPagination = true;
      this.showSortBy = true;

    }
  })

  renderSearchResults = (searchResults) => {
    if (!searchResults) return null;
    if (searchResults.items.length === 0) {
      this.showPagination = false;
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

  handleError = (error) => {
    this.errorMessage = error.message;
    this.showPagination = false;
    this.showSortBy = false;
    this.requestUpdate();
  };

  render() {
      if (!this.query) {
        return html`<welcome-message></welcome-message>`;
      }

      return html`<div id="search-results-container">
                    ${this.errorMessage ? html`<error-banner>${this.errorMessage}</error-banner>` : null}
                    ${this.showSortBy ? html`<select-filter .options=${this.options}></select-filter>`: null}
                    <div id="search-results">
                      ${this.searchTask.render({
                        pending: () => html`<search-results-skeleton count="5"></search-results-skeleton>`,
                        complete: this.renderSearchResults,
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