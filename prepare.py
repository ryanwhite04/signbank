import json

def load(file):
    f = open(file)
    return json.load(f)

def share(file, letters):
    json = load(file)
    outputs = {}
    for letter in letters:
        outputs[letter] = [
            dict(v, word=k) for k, v in json.items() if k.lower().startswith(letter)
        ][0:4]
    print(outputs)

def count(file):
    f = open(file)
    d = json.load(f)
    signs = []
    for s in d.values(): signs += s
    print(len(signs))

def main():
    count('auslan-signbank-signs.json')