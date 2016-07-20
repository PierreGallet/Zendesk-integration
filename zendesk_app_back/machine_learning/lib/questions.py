# -*- coding: utf-8 -*-

class Questions:
    """ Classe définissant la structure de données associée aux questions transformées par doc2vec """
    """ data est une liste de listes contenant :
            - aux index différents de 0 : les vecteurs de questions ( par doc2vec )
            - à l'index 0 : la moyenne des vecteurs [1:] """

    def __init__(self):
        self.data = []

    def get_index(self, index):
        """ Renvoie la moyenne des vecteurs du cluster à l'index demandé """
        return self.data[index][0]

    def update_index(self, vec, index):
        """ Insertion du vec comme question similaire aux questions à l'index """
        array = self.data[index]
        array.append(vec)

        new_size = len(array) - 1
        mean = ( array[0] * (new_size-1) + vec ) / new_size
        array[0] = mean

    def insert_to_index(self, vec, index):
        """ Insertion du vec comme nouvelle question ( possibilité de choisir l'index ) """
        self.data = self.data[:index] + [[vec, vec]] + self.data[index:]

    def insert_to_end(self, vec):
        """ Insertion du vec comme nouvelle question ( insertion à la fin ) """
        self.insert_to_index(vec, len(self.data))
