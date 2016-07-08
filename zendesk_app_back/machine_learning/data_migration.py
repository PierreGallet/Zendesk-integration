# -*- coding: utf-8 -*-

""" This file create a question.txt and answer.txt from a raw ticket """

import os
import sys


def chkdir():
    """ Create folder data/raw if it doesn't exists """
    if not os.path.exists("data/raw"):
        os.makedirs("data/raw")

def create_arrays():
    """ Create questions = [] ( array of array ) and answers = [] ( array ) """
    pass

def save_arrays():
    """ Save arrays questions and answer in data/arrays """
    pass

def load_arrays():
    pass


if __name__ == '__main__':
    chkdir()
    # parse arguments and create an array of comments
    ticket = []
    for arg in sys.argv[1:]:
        ticket.append(arg)