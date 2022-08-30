function mstos(ms) { return Math.floor(ms/1000); } // make times nicer to read

function scrape(letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ", start=performance.now()) {
    let last = start; // time since this last completed
    async function getPages(letter, pages=[]) {
        const href = `/dictionary/search/?query=${letter}&page=${pages.length+1}`;
        const text = await fetch(href).then(body => body.text());
        const page = (new DOMParser()).parseFromString(text, "text/html");
        let length = page.querySelectorAll('a[href^="?query"]').length || 1; // how many pages for this letter
        pages.push(page)
        const now = performance.now();
        console.log(`Start: ${mstos(now-start)}s, Last: ${mstos(now-last)}s, Letter: ${letter}, Page: ${pages.length} of ${length}`);
        last = now;
        return pages.length == length ? pages : getPages(letter, pages);
    }
    const wordsFromList = (words, { outerText, href }) => ({ ...words, [outerText]: href }); // convert link to word to spelling and url
    const wordsFromPage = (words, page) => ({ ...words, ...[...page.querySelectorAll('a[href^="/dictionary/words/"]')].reduce(wordsFromList, {}) }); // get all the words on a page
    const wordsFromLetter = async(letter) => getPages(letter).then(pages => pages.reduce(wordsFromPage, {})) // get all words starting with a letter
    const getWords = letters => letters.split("").reduce(async (promise, letter) => ({ ...(await promise), ...(await wordsFromLetter(letter)) }), Promise.resolve({})) // get all the words
    return getWords(letters)
} // This only gets the words, not the signs, and includes some that are missing signs

function getURL(word, i) {
    return {
        "know finish (been there, done that)": "https://www.auslan.org.au/dictionary/words/know%20finish%20(been%20there,%20done%20that)-1.html",
        "touch finish (been there, done that)": "https://www.auslan.org.au/dictionary/words/touch%20finish%20(been%20there,%20done%20that)-1.html",
        [word]: `https://www.auslan.org.au/dictionary/words/${encodeURIComponent(word)}-${i}.html`
    }[word]
} // The 2 special cases with commas weren't escaped properly by auslan.org.au

function getDefinitions(definitions, definition) {
    const title = definition.getElementsByClassName('panel-title')[0].textContent;
    const entries = [...definition.getElementsByClassName('definition-entry')].map(entry => entry.textContent.trim())
    return { ...definitions, [title]: entries }
} // Also has notes and stuff, maybe needs some refining

async function getSigns(word, i, words, signs=[]) {
    const href = getURL(word, signs.length+1);
    const text = await fetch(href).then(body => body.text());
    // document.head.parentElement.innerHTML = text.split('<html>')[1].split('</html')[0]
    // let page = document;
    const parser = new DOMParser();
    const page = parser.parseFromString(text, "text/html");
    let length = page.querySelectorAll(`#signinfo .btn-group:last-child [type="button"]`).length || 1; // how many pages for this letter
    const now = performance.now();
    signs.push({
        url: href,
        video: page.getElementById('signvideo') ? page.getElementById('signvideo').getElementsByTagName('source')[0].src : "",
        variants: [...page.querySelectorAll('source')].map(src => src.src).filter(src => src != page.querySelector('#signvideo source').src),
        keywords: page.getElementById('keywords').outerText.trim().split("Keywords:")[1].trim().split(",").map(keyword => keyword.trim()),
        definition: [...page.getElementsByClassName('definition-panel')].reduce(getDefinitions, {}),
        region: page.querySelector('#states img:last-child') ? page.querySelector('#states img:last-child').src : "Australia Wide",
    });
    console.log(`Start: ${mstos(now - start)}, Last: ${mstos(now - last)}, Word: ${i+1}/${words.length} Sign: ${signs.length}/${length} ${word}`);
    last = now;
    return signs.length == length ? { [word]: signs } : getSigns(word, i, words, signs);
} // There are often multiple signs for each word, on different pages, each needs scraping

let broken = [ // Words with broken links that no longer exist in the database
    "accurate", "all of you", "all-out", "American Indian", "at last", "blazer", "bracelet-bangle",
    "c-words", "cleaver", "come up to", "competed", "completion", "coordinate", "coordinator", "coronate",
    "distance (long distance)", "distant (very distant)", "effeminate", "end-point", "esteem",
    "fag (homosexual)", "fairy (homosexual)", "far (very far)", "fly (insect))", "fly (small creature)",
    "graph paper", "honour", "knife sharpener", "know finish (been there)", "mandoline", "Native American",
    "oil leak", "panel", "point (tip)", "poof", "poofter", "preserve", "red Indian", "reserve", "reserved",
    "respect", "ricochet", "sports coat", "sports jacket", "wacky",
];

let start = performance.now(); // To watch the time and make sure i'm not doing it too fast
let last = start; // Time since last sign scraped
scrape() // Get everything
    .then(words => Promise.all(words.filter(word => !broken.includes(word)).map(getSigns)))
    .then(signs => signs.reduce((signs, sign) => ({ ...signs, ...sign }), {})) // Combine them all
    .then(signs => JSON.stringify(signs, null, 2)) // Make it pretty
    .then(console.log).catch(console.error) // Can just copy from console once complete
