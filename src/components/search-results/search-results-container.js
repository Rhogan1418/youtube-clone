import { html, css, LitElement } from 'lit';
import './welcome-message.js'
class SearchResultsContainer extends LitElement {
    static properies = {
        
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
    `

    constructor() {
        super();
    }

    render() {
        return html`
            <welcome-message></welcome-message>
        `
    }
 }

 customElements.define('search-results-container', SearchResultsContainer);