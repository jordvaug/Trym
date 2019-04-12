from django.test import TestCase
from django.test import Client
from todo.models import Todo


class TodoTest(TestCase):
    """ Test module for CRUD requests"""


    def test_get(self):
        c = Client()
        response = c.get('/api/todos/')
        
        assert response.status_code == 200

    def test_post(self):
        c = Client()
        response = c.post('/api/todos/', {'title': 'A pytest', 'description': 'testing post request', 'completed': True})

        assert response.status_code == 201

    def test_put(self):
        c = Client()
        response = c.put('/api/todos/1/', {'title': 'A pytest', 'description': 'testing put request', 'completed': True})

        assert response.status_code == 200

    def test_delete(self):
        c = Client()
        response = c.delete('/api/todos/1/')

        assert response.status_code == 204