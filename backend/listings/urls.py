from django.urls import path
from .views import ListingAPIView,ListingDetailAPIView

urlpatterns = [
    path("listing",ListingAPIView.as_view()),
    path("listing/<int:id>",ListingDetailAPIView.as_view())
]
