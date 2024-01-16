from rest_framework import serializers
from .models import Property

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model=Property
        fields=["id","name","location","description","bath_room","living_room","bed_room","price","property_type","is_furnished"]