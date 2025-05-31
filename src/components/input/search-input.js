import { html, css, LitElement } from 'lit';
import magGlass from "../../assets/mag-glass.svg"

class SearchInput extends LitElement {
    static properies = {
        
    }

    static styles = css`
        input {
            background-color: transparent;
            border: 1px solid #303030;
            border-radius: 40px 0 0 40px;
            width: 400px;
            height: 36px;
            outline: none;
            padding-left: 20px;
            color: #f1f1f1;
        }

        input:focus {
            border-color: #3a66bf
        }

        button {
            background-color: #ffffff09;
            border: 1px solid #303030;
            border-left: none;
            height: 40px;
            width: 60px;
            border-radius: 0 40px 40px 0;
            cursor: pointer;
        }

        #search-wrapper {
            display: flex;
        }
    `

    constructor() {
        super();
    }

    render() {
        return html`
            <div id="search-wrapper">
                <input placeholder="Search" />
                <button><img height="20px" src=${magGlass}></button>
            </div>
        `
    }
 }

 customElements.define('search-input', SearchInput);