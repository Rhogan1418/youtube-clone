import { html, css, LitElement } from 'lit';
import { Task } from '@lit/task';
import {mapSearchResultsToStats, getVideoIds} from '../../helpers/search-results.helper.js';
import {getSearchResults, getVideoStatisticResults} from '../../services/youtube-api.js';

import './welcome-message.js';
import './search-result-card.js';
import '../select/select-filter.js';
import './search-results-skeleton.js';

const SORT_OPTIONS = [
  { name: 'Relevance', value: 'relevance' },
  { name: 'Upload Date', value: 'date' },
  { name: 'Rating', value: 'rating' },
];


class SearchResultsContainer extends LitElement {
  static properties = {
    query: {type: String},
    sortBy: {type: String}
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
        /* align-items: center; */
        width: 100%;
      }

      #search-results-container {
        display: flex;
        flex-direction: column;
        align-items: end;
        width: 100%;
      }
  `

  constructor() {
    super();
    this.query = '';
    this.sortBy = 'relevance';
    this.options = SORT_OPTIONS;
    this.addEventListener('select-filter-change', this.handleSortByChange);
  }

  searchTask = new Task(this, {
    task: async ([query, sortBy], { signal }) => {
      if (!query) return;
      const searchResults = await getSearchResults(query, sortBy, signal);
      if (!searchResults) return
      const videoStatResults = await getVideoStatisticResults(getVideoIds(searchResults), signal);
      return mapSearchResultsToStats(searchResults, videoStatResults);
    },
    args: () => [this.query, this.sortBy],
  })

  renderSearchResults = (searchResults) => {
    if (searchResults.length === 0) {
      return html`<p>We were unable to find any videos for "${this.query}"</p>`;
    }

    return html`
      ${searchResults.map(
        (searchResult) => html`<search-result-card .searchResult=${searchResult}></search-result-card>`
      )}
    `;
  }

  handleSortByChange = (e) => {
    this.sortBy = e.detail.value;
  }

  dataToTest = [1,2,3,4,5,6,7,8,9,10];

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
                        error: (reasons) => {
                          console.log('There Were errros', reasons)
                          if (reasons.includes('quotaExceeded')) {
                             return html`<p>YouTube API quota exceeded. Please try again later.</p>`;
                          } else if (reasons.includes('API_KEY_INVALID')) {
                            return html`<p>It looks like there is an issue with your API key. Either it is invalid or it was never added to the environment.</p>`;
                          }
                          return html`<p>Something went wrong. Try again soon.</p>`;
                        }
                      })}
                      </div>
                  </div>
      `
    }
}

customElements.define('search-results-container', SearchResultsContainer);