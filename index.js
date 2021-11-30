import { LitElement, css, html, repeat, initialState, Task } from "./modules.bundle.js"

class SignBank extends LitElement {

    constructor() {
        super();
        this.search = '';
        // this. signs = new SignsController(this, this.src);
    }

    task = new Task(
        this,
        ([src]) => fetch(src).then(body => body.json()),
        () => [this.src]
    );

    static styles = css`
        #heading {
            color: cyan;
        }
        #words: {
            width: 48em;
            float: right;
        }
        mwc-list-item {
            content-visibility: auto;
        }
    `;

    static properties = {
        src: {},
        search: {},
    }

    toggle(word, signs) {
        const event = new Event('toggle');
        event.detail = { word, signs };
        return () => this.dispatchEvent(event)
    }

    complete(signs) {

    }
    
    render() {
        const search = this.search;
        return html`
            ${this.task.render({
                pending: () => html`Loading Signs...`,
                complete: signs => {
                const items = Object.entries(signs).map(([word, signs]) => ({ word, signs })).filter(({ word }) => word.includes(search));
                const keyFn = item => item.word;
                const template = ({word, signs}, index) => html`<mwc-list-item @click=${this.toggle(word, signs)}>${word}</mwc-list-item>`
                let start = performance.now();
                const listItems = repeat(items, keyFn, template);
                return html`
                <slot></slot>
                <mwc-list id="words">
                    ${listItems}
                </mwc-list>`;
                },
            })}
        `;
    }
}

customElements.define('sign-bank', SignBank);