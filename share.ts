// deno run --allow-read share.ts

async function saveVideo(path: string, url: string) {
    const buffer = await fetch(url).then(res => res.arrayBuffer())
    return await Deno.writeFile(path, new Uint8Array())
}

interface Sign {
    url: string;
    video: string;
    variants: string[];
    keywords: string[];
    region: string;
    definition: { [index: string]: string[] };
}

async function load(file: string) : Promise<{ [index: string]: Sign[] }> {
    return JSON.parse(await Deno.readTextFile(file));
}

function processSign(sign: Sign) {

    return sign;
}

// async function main() {
//     const data: { [index: string]: Sign[] } = await load('auslan/signs.json');
//     const letters = "abcdefghijklmnopqrstuvwxyz";
//     const output: {[index: string]: any} = {};
//     type Entry = [string, Sign[]];
//     for (let letter of [...letters]) {
//         output[letter] = Object.entries(data)
//             .filter(([word]) => word.toLowerCase().startsWith(letter))
//             .map(([word, signs]) => {[word, signs.map(processSign)]
//             })
//             .reduce((words, entry: Entry) => {
//                 const word: string = entry[0];
//                 const signs: Sign[] = entry[1];
//                 return { ...words, [word]: signs }
//             }, {})
//         Deno.writeTextFile(`auslan/${letter}.json`, JSON.stringify(output[letter], null, 2))
//     }
//     return output;

// }

async function getRegions() {
    const data = await load('auslan/signs.json');
    const regions = Object.entries(data)
        .reduce((regions: string[], entry) => {
            let word: string = entry[0];
            let signs: any[] = entry[1];
            return [...regions, ...signs.map(sign => sign.region)]
        }, [])
        .reduce((regions: { [index: string]: number }, region: string) => {
            let string = "https://www.auslan.org.au/static/img/maps/Auslan/";
            region = region.startsWith(string) ?
                region.slice(string.length, -17) : region;
            regions[region] ??= 0;
            regions[region]++; 
            return regions
        }, {})
    return regions
}

async function getNotes(){
    const data = await load('auslan/signs.json');
    const notes = Object.entries(data)
        .reduce((notes, entry) => {
            let word: string = entry[0];
            let signs: any[] = entry[1];
            let bla: any = signs
                .filter(sign => sign.definition.Note)
                .map(sign => sign.definition.Note)
                .map(note => note.length == 1 ? note[0] : note)
                .map(note => note.length ? note : '');
            bla = (bla.length == 1) ? bla[0] : bla;
            bla = bla.length ? bla : '';
            return bla ? { ...notes, [word]: bla } : notes
        }, {})
    return notes
}
getNotes().then(console.log).catch(console.error);

