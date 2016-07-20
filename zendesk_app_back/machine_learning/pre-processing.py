# coding: utf8
from __future__ import print_function
import os, urllib, json, shutil, sys, time, csv, re, codecs, unicodedata, glob
from nltk.corpus import stopwords

def line_wrapper(txt_path):
    output = open(txt_path+".line_wrapped.txt", 'a')
    txt = open(txt_path, 'r')

    mark = ['.', '!', '?']
    carriage_returns = ['\n', '\r\n']

    lines = txt.read()
    for char in carriage_returns:
        lines = lines.replace(char, '')
    lines = re.split('\s*\.\s*', lines)

    for line in lines:
        if line:
            output.write(line + ".\n")
    

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

def preprocessing_csv(datadir, path_sentences, path_labels):
    with open(path_sentences, 'w+') as sentences:
        with open(path_labels, 'w+') as labels:
            with open(datadir, 'rb') as f:
                reader = csv.DictReader(f, fieldnames=['label', 'sentence'], delimiter=';')
                for row in reader:
                    txt = parse_txt(row['sentence'])
                    label = row['label']
                    if not label == 'label':
                        sentences.write(txt+'\n')
                        labels.write(label+'\n')
    return path_sentences, path_labels

def preprocessing_diroftxt(datadir, path_sentences, path_labels):
    with open(path_sentences, 'w+') as sentences:
        with open(path_labels, 'w+') as labels:
            j = 0
            for directory in glob.glob(datadir+'/*'):
                files = os.listdir(directory)
                print('dealing with', directory)
                for i in range(len(files)):
                    with open(directory+'/'+files[i]) as f:
                        txt = parse_txt(f.read())
                        if directory.split('/')[-1] == 'pos':
                            label = str(1)
                        else:
                            label = str(0)
                        sentences.write(txt+'\n')
                        labels.write(label+'\n')
                        j += 1
    print(str(j) + ' sentences preprocessed in total')
    return path_sentences, path_labels

def preprocessing_paraphrase(path_sentences, path_sentences_1, path_sentences_2, path_labels):
    with open(path_sentences, 'w+') as sentences:
        with open(path_sentences_1, 'w+') as sentences_1:
            with open(path_sentences_2, 'w+') as sentences_2:
                with open(path_labels, 'w+') as labels:
                    j = 0
                    with open(datadir) as f:
                        # print(f.read().splitlines())
                        for line in f.read().splitlines():
                            if (j % 3 == 0):
                                labels.write(line+'\n')
                            elif (j % 3 == 1):
                                sentences_1.write(parse_txt(line)+'\n')
                                sentences.write(parse_txt(line)+'\n')
                            else:
                                sentences_2.write(parse_txt(line)+'\n')
                                sentences.write(parse_txt(line)+'\n')
                            j += 1
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
    ### for Paraphrase detection ###
    #datadir = './data/MRPC/train.txt'
    # try:
    #     shutil.rmtree('./pd')
    # except:
    #     pass
    # os.mkdir('./pd')
    # os.mkdir('./pd/tmp')
    # os.mkdir('./pd/tmp/models_saved')
    # os.mkdir('./pd/input')
    # os.mkdir('./pd/input/train')
    # os.mkdir('./pd/input/test')
    # os.mkdir('./pd/input/formated')
    # os.mkdir('./pd/input/formated/train')
    # os.mkdir('./pd/input/formated/test')
    #path_sentences = './pd/input/train/sentences.txt'
    #path_sentences_1 = './pd/input/train/sentences_1.txt'
    #path_sentences_2 = './pd/input/train/sentences_2.txt'
    #path_labels = './pd/input/train/labels.txt'
    ################################
    # if datadir.split('.')[-1] == 'csv':
    #     preprocessing_csv(datadir, path_sentences, path_labels)
    # else:
    #     preprocessing_diroftxt(datadir, path_sentences, path_labels)
    #preprocessing_paraphrase(path_sentences, path_sentences_1, path_sentences_2, path_labels)
    
    line_wrapper('test.txt')

#    with open('ressources/dataset_AA.txt', 'r') as sentences:
#        print(parse_txt(sentences.read()))