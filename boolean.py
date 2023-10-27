#!/usr/bin/env python3 
from inverted_index import *

def merge(p1, p2):
	ret = []
	p1_ptr = 0
	p2_ptr = 0
	# Check if we are actually inside the list
	while p1_ptr < len(p1) and p2_ptr < len(p2):
		if p1[p1_ptr] == p2[p2_ptr]:
			ret.append(p1[p1_ptr])
		# Increment smaller on until it becomes equal
		elif p1[p1_ptr] < p2[p2_ptr]:
			p1_ptr += 1
		else:
			p2_ptr += 1
	return ret

def process(query:str, inverted_index: dict):
    query = query.split()
    for i, v in enumerate(query):
        if v not in ["AND", "OR", "NOT"]:
            query[i] = inverted_index.get(v)
        else:
            query[i] = v.lower()
    print(query)
    return

def main():
    #corpus = ["I did enact Julius Caesar I was killed  the Capitol Brutus killed me".lower().split(), 
    #          "So let it be with Caesar The noble Brutus hath told you Caesar was ambitious".lower().split()]
    #inverted_index = inverted_index_create(corpus)
    inverted_index = {
            "brutus": inverted_index_item(8, [1, 2, 4, 11, 31, 45, 173, 174]), 
            "caesar": inverted_index_item(8, [1, 2, 4, 5, 6, 16, 57, 132]),
            "calpurnia": inverted_index_item(4, [2, 31, 54, 101])
            }
    query = "brutus AND calpurnia"
    process(query, inverted_index)
    return

if __name__ == "__main__":
    main()
