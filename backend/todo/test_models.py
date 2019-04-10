from django.test import TestCase
from .models import Todo

class TodoTest(TestCase):
    """ Test module for Todo model """

    def setUp(self):
        Todo.objects.create(
            title='Build Tests', description='Build some tests in python')
        Todo.objects.create(
            title='Build Model Test', description='Build some tests in python for the Todo model')

    def test_todo_title(self):
        todo_title_build = Todo.objects.get(title='Build Tests')
        todo_title_model = Todo.objects.get(title='Build Model Test')
        self.assertEqual(
            puppy_casper.get_breed(), "Build some tests in python")
        self.assertEqual(
            puppy_muffin.get_breed(), "Build some tests in python for the Todo model")