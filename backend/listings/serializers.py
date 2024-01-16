from rest_framework import serializers
from .models import Listing

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model=Listing
        fields=["id","name","description","price","listing_type"]