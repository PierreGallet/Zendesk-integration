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
    return re.split('\([0-9]{2}:[0-9]{2}:[0-9]{2} [AP]M\) ',body_public)[1:]

def split_interlocutors(array_comments, operator_name):
    """ Return two parallel lists with matching indexes of questions ( client ) and answers ( operator ) """
    client = []
    operator = []

    operator_talked = True

    for item in array_comments:
        try:
            speaker, sentence = re.match(r'(.*?): (.*)', item).groups()
            if speaker == operator_name:
                if operator_talked:
                    operator[-1] += ' ' + sentence
                else:
                    operator.append(sentence)
                operator_talked = True
            else:
                if not operator_talked:
                    client[-1] += ' ' + sentence
                else:
                    client.append(sentence)
                operator_talked = False

        except:
            pass

    return client, operator

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
    client, operator = split_interlocutors(get_array_comments(body_public), get_operator_name(body_private))
    print client
    print operator
