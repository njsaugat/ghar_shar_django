from django.urls import path
from .views import PropertyAPIView,PropertyDetailAPIView,UserPropertyAPIView
urlpatterns = [
    path("property",PropertyAPIView.as_view()),
    path("property/<int:id>",PropertyDetailAPIView.as_view()),
    path("user/properties",UserPropertyAPIView.as_view())
] 
