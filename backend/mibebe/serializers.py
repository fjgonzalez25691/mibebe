from os import error
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User

from .models import UserProfile

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        error_messages={
            'blank': 'El campo de contraseña no puede estar vacío.',
            'required': 'El campo de contraseña es obligatorio.',
            'min_length': 'La contraseña debe tener al menos 8 caracteres.'
        }
    )
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all(), message="Este correo electrónico ya está en uso.")],
        error_messages={
            'blank': 'El campo de correo electrónico no puede estar vacío.',
            'required': 'El campo de correo electrónico es obligatorio.',
            'invalid': 'Ingrese un correo electrónico válido.'
        }
    )
    phone = serializers.CharField(max_length=15, required=False, allow_blank=True)
    
    class Meta:
        model = User
        fields = ('username', 'password', 'email','first_name', 'last_name', 'phone')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        phone = validated_data.get('phone', '')
        if phone:
            user.userprofile.phone = phone
            user.userprofile.save()
        return user