#/usr/bin/env python3



def kgram_create(term:str, k:int)->list[str]:
    return ["".join(j) for j in zip(*[term[i:] for i in range(k)])]

def kgram_num(term, k):
    return len(term) + 1 - k

def jaccard_coefficient(query:str, term:str, k:int)->float:
    kgram = kgram_create(query, k)
    ins = 0
    for q in kgram:
        if q in term:
            ins += 1
    return ins/(kgram_num(term, k) + len(kgram) - ins)

def edit_distance(a:str, b:str):
    mat = [[0 for _ in range(len(b)+1)] for _ in range(len(a)+1)]
    mat[0][0] = 0;
    for i in range(len(a)+1):
        mat[i][0] = i

    for i in range(len(b)+1):
        mat[0][i] = i

    for i in range(1, len(a)+1):
        for j in range(1, len(b)+1):
            mat[i][j] = min(
                    mat[i-1][j-1] + (0 if a[i-1] == b[j-1]  else 1),
                    mat[i-1][j]+1,
                    mat[i][j-1]+1
                    )
    return mat[-1][-1]

def candidate_vocab_get(query:str, vocab:list[str], k:int):
    candidate_dict: dict[str, float]
    candidate_dict = {}
    for term in vocab:
        candidate_dict[term] = jaccard_coefficient(query, term, k)
    return dict(sorted(candidate_dict.items(), key=lambda x: x[1], reverse=True))

def spell_check(query:str, vocab:list[str], k):
    candidate_vocab = candidate_vocab_get(query, vocab, k)
    for term in candidate_vocab:
        candidate_vocab[term] = edit_distance(query, term)
    candidate_vocab = dict(sorted(candidate_vocab.items(), key=lambda x: x[1]))
    return candidate_vocab



def main():
    vocab = ["aboard", "about", "boardroom", "border", "lord", "morbid", 
             "sordid"]
    print(spell_check("bord", vocab, 2))
    return

if __name__ == "__main__":
    main()
