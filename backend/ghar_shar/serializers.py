from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        print("here from serializer-------->")
        model=User
        fields=['id','email','first_name','last_name']