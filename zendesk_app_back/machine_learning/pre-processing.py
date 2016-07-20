# -*- coding: utf-8 -*-

from __future__ import print_function
import os, urllib, json, shutil, sys, time, csv, re, codecs, unicodedata, glob
from nltk.corpus import stopwords


def split_sentences(lines):
    """
    Split paragraph into array of sentences
    :param txt: one or more paragraph
    :return: array of sentences
    """
    mark = ['.', '!', '?']
    carriage_returns = ['\n', '\r\n']

    for char in carriage_returns:
        lines = lines.replace(char, '')
    lines = re.split('\s*\.\s*', lines)

    for line in lines:
        if line:
            yield line

def parse_txt(txt):
    """
    Splits a string into an lean string without punctiation, carriage returns & stopwords.
    """
    punctuation = ['(', ')', ':', ';', '«', '»', ',', '-', '!', '.', '?', '/', '[', ']', '{', '}',
                   '#', '"', '*', '-', "`", '"', '>>', '|', '/', '*', '•', ' ', "d'", "j'",
                   "t'", "l'", "s'", "n'", "qu'", "c'"]
    carriage_returns = ['\n', '\r\n']
    word_regex = "^[a-zàâçéèêëîïôûùüÿñæœ/+ .-]+$"
    stop_words_set = set()
    stopwordsfile = stopwords.words('french')
    for word in stopwordsfile:  # a stop word in each line
        word = word.replace("\n", '')
        word = word.replace("\r\n", '')
        stop_words_set.add(word)
    clean_txt = ''
    words = txt.split()
    for word in words:
        # lower case
        word = word.lower()
        # remove punctuation & carriage returns
        for punc in punctuation + carriage_returns:
            word = word.replace(punc, ' ').strip(' ')
        # check if it is normal letters
        if not re.match(word_regex, word):
            word = None
        # remove stopwords
        if word and (word not in stop_words_set) and (len(word) > 1):
            try:
                words = unicodedata.normalize('NFKD', unicode(word, 'utf-8')).encode('ASCII', 'ignore').split()
                for word in words:
                    if word and (word not in stop_words_set) and (len(word) > 1):
                        clean_txt = clean_txt + word + ' '
            except:
                pass
    return clean_txt

if __name__ == '__main__':
    ### for Deep learning ####
    # datadir = './data/Stanford - IMDB review sentiment analysis dataset/ang/test'
    # os.mkdir('./dl')
    # os.mkdir('./dl/tmp')
    # os.mkdir('./dl/tmp/models_saved')
    # os.mkdir('./dl/input')
    # os.mkdir('./dl/input/test')
    # os.mkdir('./dl/input/formated')
    # os.mkdir('./dl/input/formated/test')
    # path_sentences = './dl/input/test/sentences.txt'
    # path_labels = './dl/input/test/labels.txt'
    # #### for Machine learning ####
    # datadir = './data/kaggle - Bag of Words Meets Bags of Popcorn/train.csv'
    #
    # os.mkdir('./ml')
    # os.mkdir('./ml/tmp')
    # os.mkdir('./ml/tmp/models_saved')
    # os.mkdir('./ml/input')
    # os.mkdir('./ml/input/formated')
    #
    # path_sentences = './ml/input/sentences.txt'
    # path_labels = './ml/input/labels.txt'
    ################################

    file = open('test.txt', 'r')
    for line in split_sentences(file.read()):
        print(line)
    file.close()
    #print(parse_txt("Coucou, ceci est un message de test pour savoir si j'suis pas un toto\nsCeci est la deuxième phrase !"))
