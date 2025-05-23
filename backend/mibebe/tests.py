# filepath: [tests.py](http://_vscodecontentref_/0)
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status

class JWTAuthTest(APITestCase):
    def setUp(self):
        self.username = "testuser"
        self.password = "testpass123"
        self.user = User.objects.create_user(username=self.username, password=self.password)

    def test_jwt_authentication(self):
        # Obtener el token
        response = self.client.post('/api/token/', {
            'username': self.username,
            'password': self.password
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        token = response.data['access']

        # Acceder a una vista protegida
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        response = self.client.get('/api/hello/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"message": "Hello, world!"})
