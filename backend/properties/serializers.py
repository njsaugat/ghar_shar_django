from rest_framework import serializers
from .models import Property

class PropertySerializer(serializers.ModelSerializer):
    image_url = serializers.ImageField(required=False)
    class Meta:
        model=Property
        fields=["id","name","location","description","bath_room","living_room","bed_room","price","property_type","is_furnished","user_id","image_url"]