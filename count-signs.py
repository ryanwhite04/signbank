import json
f = open('auslan-signbank-signs.json')
d = json.load(f)
signs = []
for s in d.values(): signs += s
print(len(signs))