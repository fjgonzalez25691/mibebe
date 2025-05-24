from operator import is_
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer
from rest_framework import status
from django.contrib.auth.models import User

# Create your views here.
class HelloView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "Hello, world!"})
    
class RegisterView(APIView):
    def post(self, request):
        # Here you would handle the registration logic
        # For example, create a new user in the database
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully!"})
        return Response(serializer.errors, status=400)

class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "username": user.username,
            "email": user.email,
            "id": user.id
        }, status=status.HTTP_200_OK)
    
