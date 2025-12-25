import json

def matching(arr1, arr2, strictness=0.5):  
    if not arr1 or not arr2:  
        return False  
    set2 = set(arr2)  
    intersection_count = sum(1 for item in arr1 if item in set2)  
    return (intersection_count / len(arr1) >= strictness and intersection_count / len(arr2) >= strictness)
        
def extract_videos(dictionary):
    urls = set()
    for item in dictionary:
        urls.add(item)
        for variant in dictionary[item]["variants"]:
            urls.add(variant)
    return urls

def getID(url):
    # https://auslan.org.au/dictionary/video/1234.mp4 to 1234
    parts = url.split("/")
    filename = parts[-1]
    id = filename.split(".")[0]
    return id

def main(file, dictionary_file, urls_file, ids_file):
    dictionary = {}
    file = open(file, "r")
    words = json.load(file)
    for word in words:
        for item in words[word]:
            url = item["video"]
            if url not in dictionary:
                dictionary[url] = item
    
    for a in dictionary:
        for b in dictionary:
            if a != b:
                first_keywords = dictionary[a]["keywords"]
                second_keywords = dictionary[b]["keywords"]
                if matching(first_keywords, second_keywords):
                    print(f"Matching keywords found between {first_keywords[0]} and {second_keywords[0]}")
                    dictionary[b]["variants"].append(a)
            
    with open(dictionary_file, "w") as outfile:
        existing = json.load(outfile) if outfile.tell() > 0 else {}
        existing.update(dictionary)
        json.dump(existing, outfile)
    
    urls = extract_videos(dictionary)
    with open(urls_file, "w") as urlfile:
        existing = urlfile.read().splitlines() if urlfile.tell() > 0 else []
        urls.update(existing)
        for url in urls:
            urlfile.write(url + "\n")
            
    ids = [getID(url) for url in urls]
    with open(ids_file, "w") as idfile:
        existing = idfile.read().splitlines() if idfile.tell() > 0 else []
        ids.extend(existing)
        for id in ids:
            idfile.write(id + "\n")

# python combine.py auslan/signs.json
if __name__ == "__main__":
    
    import sys
    if len(sys.argv) < 2:
        print("Please provide the input file as an argument.")
    else:
        file = sys.argv[1]
        main(file, "dictionary.json", "urls.txt", "ids.txt")