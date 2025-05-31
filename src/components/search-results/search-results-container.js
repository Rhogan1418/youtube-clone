import { html, css, LitElement } from 'lit';
import { Task } from '@lit/task';
import {mapSearchResultsToStats, getVideoIds} from '../../helpers/search-results.helper.js'
import {getSearchResults, getVideoStatisticResults} from '../../services/youtube-api.js'

import './welcome-message.js'
import './search-result-card.js';

class SearchResultsContainer extends LitElement {
    static properties = {
      query: {type: String},
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
        flex-direction: column;
       }
    `

    constructor() {
      super();
      this.query = '';
    }

    searchTask = new Task(this, {
      task: async ([query], { signal }) => {
        if (!query) return;
        console.log('Made it to')
        const searchResults = await getSearchResults(query, signal);
        console.log('sr', searchResults)
        if (!searchResults) return
        const videoStatResults = await getVideoStatisticResults(getVideoIds(searchResults), signal);
        console.log('vs', videoStatResults)
        return mapSearchResultsToStats(searchResults, videoStatResults);
      },
      args: () => [this.query],
    })

    renderSearchResults = (searchResults) => {
      console.log('Is this being called?')
      if (searchResults.length === 0) {
        return html`<p>We were unable to find any videos for "${this.query}"</p>`;
      }

      return html`<div id="search-results">
        ${searchResults.map(
          (searchResult) => html`<search-result-card .searchResult=${searchResult}></search-result-card>`
        )}
        </div>
      `;
    }


    render() {
      if (!this.query) {
        console.log('Made it here!!!')
        return html`<welcome-message></welcome-message>`;
      }

      return this.searchTask.render({
        pending: () => html`<p>Loading some awesome videos...</p>`,
        complete: this.renderSearchResults,
        error: (e) => html`<p>It looks like we are experiencing some turbulence. Buckle up and retry in a moment. ${e}</p>`
      })
    }
 }

 customElements.define('search-results-container', SearchResultsContainer);