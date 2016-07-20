# -*- coding: utf-8 -*-

import unittest
from machine_learning.lib.answers import Answers


class TestClassAnswers(unittest.TestCase):

    def test_add_answer(self):
        answers_array = Answers()
        answers_array.insert_to_end("coucou")
        self.assertEqual(answers_array.data[0], "coucou")

    def test_get_answer(self):
        answers_array = Answers()
        answers_array.insert_to_end("coucou")
        self.assertEqual(answers_array.get_index(0), "coucou")

    def test_insert_index(self):
        answer_array = Answers()
        answer_array.insert_to_end("coucou")
        answer_array.insert_to_end("youpi")
        self.assertEqual(answer_array.data, ["coucou", "youpi"])
        answer_array.insert_to_index("tralala", 1)
        self.assertEqual(answer_array.data, ["coucou", "tralala", "youpi"])


if __name__ == '__main__':
    unittest.main()
