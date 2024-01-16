from django.urls import path
from .views import PropertyAPIView,PropertyDetailAPIView

urlpatterns = [
    path("property",PropertyAPIView.as_view()),
    path("property/<int:id>",PropertyDetailAPIView.as_view())
]
