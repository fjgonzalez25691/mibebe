from django.db import router
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import HelloView

router = DefaultRouter()

urlpatterns = [
    path('hello/', HelloView.as_view(), name='hello'),
]
