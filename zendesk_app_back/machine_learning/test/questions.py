# -*- coding: utf-8 -*-

import unittest
from machine_learning.lib.questions import Questions
import numpy as np


class TestClassQuestions(unittest.TestCase):

    def test_add_question(self):
        vec = np.array([1, 1, 1], float)
        questions_obj = Questions()
        questions_obj.insert_to_end(vec)
        self.assertEqual(questions_obj.data, [[vec, vec]])

    def test_get_question(self):
        vec = np.array([1, 1, 1], float)
        questions_obj = Questions()
        questions_obj.insert_to_end(vec)
        self.assertTrue((questions_obj.get_index(0) == vec).all())

    def test_insert_index(self):
        vec_a = np.array([1, 1, 1], float)
        vec_b = np.array([5, 5, 5], float)
        vec_c = np.array([9, 9, 9], float)
        questions_obj = Questions()
        questions_obj.insert_to_end(vec_a)
        questions_obj.insert_to_end(vec_b)
        self.assertEqual(questions_obj.data, [[vec_a, vec_a], [vec_b, vec_b]])
        questions_obj.insert_to_index(vec_c, 1)
        self.assertEqual(questions_obj.data, [[vec_a, vec_a], [vec_c, vec_c], [vec_b, vec_b]])

    def test_update_index(self):
        vec_a = np.array([1, 1, 1], float)
        vec_b = np.array([5, 5, 5], float)
        vec_c = np.array([9, 9, 9], float)
        questions_obj = Questions()
        questions_obj.insert_to_end(vec_a)
        questions_obj.update_index(vec_b, 0)
        self.assertEqual(questions_obj.data[0][1:], [vec_a, vec_b])
        self.assertTrue((questions_obj.get_index(0) == np.array([3, 3, 3], float)).all())
        questions_obj.update_index(vec_c, 0)
        self.assertEqual(questions_obj.data[0][1:], [vec_a, vec_b, vec_c])
        self.assertTrue((questions_obj.get_index(0) == np.array([5, 5, 5], float)).all())


if __name__ == '__main__':
    unittest.main()
