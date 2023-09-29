#!/usr/bin/env python3
from nltk.tokenize import word_tokenize


def main():
    s = '''Good muffins cost $3.88\nin New York.  Please buy me
two of them.\n\nThanks.'''
    print(word_tokenize(s))
    return


if __name__ == "__main__":
    main()
