# -*- coding: utf-8 -*-

class Answers:
    """ Classe définissant la structure de données associée aux réponses raw """

    def __init__(self):
        self.data = []

    def get_index(self, index):
        return self.data[index]

    def insert_to_index(self, answer, index):
        self.data = self.data[:index] + [answer] + self.data[index:]

    def insert_to_end(self, answer):
        self.insert_to_index(answer, len(self.data))
