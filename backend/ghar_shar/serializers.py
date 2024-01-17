from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        print("here from serializer-------->")
        model=User
        fields=['id','email','first_name','last_name','password','username']


class AuthenticatedResponseSerializer(serializers.Serializer):
    loggedIn=serializers.BooleanField()
    user_id=serializers.IntegerField(required=False)
    message=serializers.CharField(required=False)