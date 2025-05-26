# filepath: [tests.py](http://_vscodecontentref_/0)
from urllib import response
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from mibebe.models import UserProfile
from django.urls import reverse

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

        # Acceder a una vista protegida (UserView)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        url = reverse('user')  # /api/users/
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('username', response.data)
        self.assertIn('email', response.data)
        self.assertIn('id', response.data)

    def test_jwt_authentication_invalid_credentials(self):
        # Intentar obtener el token con credenciales inválidas
        response = self.client.post('/api/token/', {
            'username': 'invaliduser',
            'password': 'invalidpass'
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # Intentar acceder a una vista protegida sin token
        url = reverse('user')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class RegisterTestCase(APITestCase):
    def test_register_user_success(self):
        url = reverse('register')
        data = {
            "username": "testuser",
            "email": "testuser@example.com",
            "first_name": "Test",
            "last_name": "User",
            "phone": "123456789",
            "password": "testpassword",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(User.objects.filter(username="testuser").exists())
        self.assertTrue(UserProfile.objects.filter(user__username="testuser").exists())

    def test_register_user_missing_field(self):
        url = reverse('register')
        data = {
            "username": "",
            "email": "testuser@example.com",
            "first_name": "Test",
            "last_name": "User",
            "phone": "123456789",
            "password": "testpassword",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
    # Test for duplicate username
    def test_register_user_duplicate_username(self):
        url = reverse('register')
        data = {
            "username": "testuser",
            "email": "testuser@example.com",
            "first_name": "Test",
            "last_name": "User",
            "phone": "123456789",
            "password": "testpassword",
        }
        # Creamos un segundo usuario con el mismo nombre de usuario
        data_duplicate = {
            "username": "testuser",
            "email": "testuser2@example.com",
            "first_name": "Test2",
            "last_name": "User2",
            "phone": "123456789",
            "password": "testpassword",
        }
        response = self.client.post(url, data)
        # Guardamos el segundo usuario
        response_duplicate = self.client.post(url, data_duplicate)
        self.assertEqual(response_duplicate.status_code, status.HTTP_400_BAD_REQUEST)
        
    # Test for duplicate email
    def test_register_user_duplicate_email(self):
        url = reverse('register')
        data = {
            "username": "testuser3",
            "email": "testuser@example.com",
            "first_name": "Test3",
            "last_name": "User3",
            "phone": "123456789",
            "password": "testpassword",
        }
        data_duplicate = {
            "username": "testuser4",
            "email": "testuser@example.com",
            "first_name": "Test4",
            "last_name": "User4",
            "phone": "123456789",
            "password": "testpassword",
        }
        response = self.client.post(url, data)
        # Guardamos el segundo usuario
        response_duplicate = self.client.post(url, data_duplicate)
        self.assertEqual(response_duplicate.status_code, status.HTTP_400_BAD_REQUEST)
        
    # Vamos a registrar un usuario con la contraseña con menos de 8 caracteres
    def test_register_user_short_password(self):
        url = reverse('register')
        data = {
            "username": "shortpassuser",
            "email": "shortpass@example.com",
            "first_name": "Short",
            "last_name": "Pass",
            "phone": "123456789",
            "password": "short",  # Menos de 8 caracteres
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('password', response.data)

    def test_register_user_invalid_email(self):
        url = reverse('register')
        data = {
            "username": "invalidemailuser",
            "email": "invalidemail",  # Email inválido
            "first_name": "Invalid",
            "last_name": "Email",
            "phone": "123456789",
            "password": "validpassword",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)
        
    def register_user_without_phone(self):
        url = reverse('register')
        data = {
            "username": "nophoneuser",
            "email": "nophone@example.com",
            "first_name": "No",
            "last_name": "Phone",
            "phone": "",
            "password": "validpassword",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)