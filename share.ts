// deno run --allow-read share.ts

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

async function main() {
    const data: { [index: string]: Sign[] } = await load('auslan/signs.json');
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const output: {[index: string]: any} = {};
    for (let letter of [...letters]) {
        output[letter] = Object.entries(data)
            .filter(([key]) => key.toLowerCase().startsWith(letter))
            .reduce((words, [word, signs]) => ({ ...words, [word]: signs }), {})
        Deno.writeTextFile(`auslan/${letter}.json`, JSON.stringify(output[letter],
                                                            null, 2))
    }
    return output;

}

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
getRegions().then(console.log).catch(console.error);

