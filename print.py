import json

list = open("count_1w.txt").read().splitlines()
items = [line.split("\t") for line in list]
s = sum(int(frequency) for _, frequency in items)
d = {key: int(frequency)/s for key, frequency in items}

alternate = open("frequency_custom.txt").read().splitlines()

for line in alternate:
    key, frequency = line.split("\t")
    d[key.lower()] = float(frequency)

def getFrequency(keywords):
    frequency = 0
    for word in keywords:
        word = word.lower()
        if word in d:
            frequency += d[word]
    return frequency

def getID(url):
    # https://auslan.org.au/dictionary/video/1234.mp4 to 1234
    parts = url.split("/")
    filename = parts[-1]
    id = filename.split(".")[0]
    return id


def formatItem(item):
    # if item starts with a number and full stop, remove it from the front
    item = item.strip()
    if len(item) > 2 and item[0].isdigit() and item[1] == ".":
        item = item[2:].strip()
    item.replace("\n", "")
    return f"<li>{item}</li>"
    
def formatDescription(definition):
    return "".join([
        f"<h3>{key}</h3><ul>" + "".join([formatItem(item) for item in definition[key] if item != ""]) + "</ul>"
        for key in definition if len(definition[key]) > 0
    ])
    
    
def formatVideo(url, link):
    number = getID(url)
    return f'<video autoplay playsinline loop muted><source src="{number}.mp4"><source src="{number}.ogv"></video>'
    
def main():
    with open("dictionary.json") as f:
        notes = []
        num = 30000
        # load dictionary entries into notes
        dictionary = json.load(f)
        for entry in dictionary:
            data = dictionary[entry]
            name = getID(entry)
            note = {}
            note["name"] = name
            note["link"] = data["url"]
            note["variants"] = "".join([formatVideo(variant, note["link"]) for variant in data["variants"]])
            note["description"] = formatDescription(data["definition"])
            note["keywords"] = ", ".join(data["keywords"])
            note["region"] = data["region"]
            note["frequency"] = getFrequency(data["keywords"])
            notes.append(note)

        notes.sort(key=lambda x: x["frequency"], reverse=True)
        for note in notes:
            note["frequency"] = f"{note['frequency']:.8f}"
        tsv = asTSV(notes)
        print(tsv)
            
def asTSV(list):
    # the fields are: name, URL, Keywords, Alternates, Definition, Tags
    # tags are space separated
    lines = [
        "# separator:	",
        "# tag:V1",
        "# columns:Name	Link	Variants	Keywords	Definition	Region	Frequency",
        "# deck:Auslan",
        "# notetype:Auslan",
    ]
    for note in list:
        lines.append("\t".join([
            note["name"],
            note["link"],
            note["variants"],
            note["keywords"],
            note["description"],
            note["region"],
            note["frequency"],
        ]))
    return "\n".join(lines)

            
if __name__ == "__main__":
    # pass
    main()
    
