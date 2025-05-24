from django.db import router
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import UserView, RegisterView

router = DefaultRouter()

urlpatterns = [
    path('users/', UserView.as_view(), name='user'),
    path('users/register/', RegisterView.as_view(), name='register'),
]
