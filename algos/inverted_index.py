#!/usr/bin/env python3
from dataclasses import dataclass, field

@dataclass
class inverted_index_item():
    doc_freq: int = 0
    posting_list: list[int] = field(default_factory=list)
    def __and__(self, other):
        ret = []
        p1 = self.posting_list
        p2 = other.posting_list
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







def inverted_index_create(corpus):
    tmp = []
    for i, doc in enumerate(corpus):
        for term in doc:
            tmp.append((term, i))

    inverted_index: dict[str, inverted_index_item]
    inverted_index = {}

    tmp.sort()

    for tup in tmp:
        term, doc_id = tup
        tmp2 = inverted_index.get(term, inverted_index_item())
        # Only add if it is not present
        if not tmp2.posting_list or tmp2.posting_list[-1] != doc_id:
            tmp2.posting_list.append(doc_id)
            tmp2.doc_freq += 1
        inverted_index[term] = tmp2

    return inverted_index
