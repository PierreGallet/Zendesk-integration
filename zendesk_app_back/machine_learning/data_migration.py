# -*- coding: utf-8 -*-

""" This file create a question.txt and answer.txt from a raw ticket """

import os
import re
import sys


def get_operator_name(body_private):
    try:
        operator_name = re.search('^Served by: (.*)$', body_private, re.MULTILINE).group(1)
    except AttributeError:
        operator_name = ''

    return operator_name

def get_array_comments(body_public):
    body_public = body_public.replace('\n', '')
    return re.split('\([0-9]{2}:[0-9]{2}:[0-9]{2} [AP]M\)',body_public)[1:]
    

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

    # parse arguments
    ticket_type, body_private, body_public = sys.argv[1:]
    print get_array_comments(body_public)
