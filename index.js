import { LitElement, css, html, initialState, Task } from "./modules.bundle.js"

class SignBank extends LitElement {

    constructor() {
        super();
        this.search = '';
        // this. signs = new SignsController(this, this.src);
    }

    task = new Task(
        this,
        async ([src]) => {
            console.log('task', src);
            const response = await fetch(src);
            const result = await response.json();
            console.log('task', result);
            const error = result.error;
            // if (error !== undefined) {
            //     throw new Error(error);
            // }
            return result;
        },
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
    
    render() {
        return html`
            ${this.task.render({
                pending: () => html`Loading Signs...`,
                complete: signs => {
                    let items = Object.entries(signs)
                        .filter(([word]) => word.includes(this.search))
                        .map(([word, signs]) => html`<mwc-list-item @click=${this.toggle(word, signs)}>${word}</mwc-list-item>`)
                    return html`<mwc-list id="words">${items}</mwc-list>`
                },
            })}
        `;
    }
}

class SignEntry extends LitElement {

    static properties = {
        word: {},
        open: { type: Boolean },
        signs: { type: Array },
    }

    constructor() {
        super();
        this.addEventListener('click', this.toggle);
        this.open = false;
    }

    toggle() {
        this.open = !this.open;
    } 

    signTemplate(sign) {
        return html`<mwc-list-item><video controls autoplay loop src=${sign.video}></video></mwc-list-item>`
    }

    render() {
        return html`<p>${this.word}</p>`
    }
}

customElements.define('sign-entry', SignEntry);
customElements.define('sign-bank', SignBank);