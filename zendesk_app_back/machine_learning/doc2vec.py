#coding: utf8
from __future__ import print_function
from gensim.models.doc2vec import Doc2Vec, TaggedLineDocument
from gensim.models import doc2vec
import logging
import numpy as np
from sklearn.cross_validation import train_test_split, StratifiedKFold
import pickle
from gensim import corpora, models
from collections import defaultdict
import operator

logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

def training_doc2vec(path_sentences, size=10000):
    documents = TaggedLineDocument(path_sentences)
    model = Doc2Vec(documents, size, window=15, min_count=10)
    model.save('./doc2vec/dataset')
    
def get_doc2vec_vectors(path_sentences):
    model = Doc2Vec.load('./ml/doc2vec')
    emb_dim = model.vector_size
    with open(path_sentences, 'r+') as f:
        lines = f.readlines()
        sentences = np.zeros((len(lines), emb_dim))
        i = 0
        for line in lines:
            sentences[i] = model.docvecs[i]
            i += 1
    return sentences

def formatting_ml_input(path_sentences, path_labels):
    sentences = get_doc2vec_vectors(path_sentences)
    with open(path_labels, 'r+') as f:
        lines = f.readlines()
        labels = np.zeros((len(lines), 1))
        i = 0
        for line in lines:
            labels[i] = line
            i += 1
    print("saving formated input")
    with open('./ml/input/formated/doc2vec/sentences.npy', 'wb') as f:
        np.save(f, sentences)
    with open('./ml/input/formated/doc2vec/labels.npy', 'wb') as f:
        np.save(f, labels)
    print('shape of sentences', sentences.shape)
    print('shape of labels', labels.shape)
    return sentences, labels

if __name__ == '__main__':
    path_sentences = './ressources/wikipedia/preprocessed/dataset_AA.txt'
#    path_labels = './ml/input/labels.txt'
    training_doc2vec(path_sentences)
    
    model = Doc2Vec.load('./doc2vec/dataset')
#    print(model.similar_by_word('purple', topn=3, restrict_vocab=None))
#    print(model.similar_by_word('blue', topn=3, restrict_vocab=None))
#    print(model.similar_by_vector([1,2]))
    print(model.most_similar(positive=['king', 'woman'], negative=['man'], topn=3, restrict_vocab=None))
#    print(model.doesnt_match("cereal breakfast dinner lunch".split()))
#    sentences, labels = formatting_ml_input(path_sentences, path_labels)
#    print(TaggedLineDocument("./ressources/HarryPotter"))

