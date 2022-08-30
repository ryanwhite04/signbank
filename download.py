import requests

def downloadfile(name, url):
    name = name
    r = requests.get(url)
    f = open(name, 'wb');
    for chunk in r.iter_content(chunk_size=255): 
        if chunk: f.write(chunk)
    f.close()