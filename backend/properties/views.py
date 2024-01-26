from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Property
from .serializers import PropertySerializer
from ghar_shar.serializers import UserSerializer
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.parsers import MultiPartParser, FormParser,JSONParser

def get_form_data(request):
    data = {
    'name': request.data.get("name"), 
    'location':request.data.get("location"),
    'description': request.data.get("description"),
    'is_furnished':bool(request.data.get("is_furnished")),
    'price':request.data.get("price"),
    'property_type':request.data.get("property_type") ,
    'living_room':request.data.get("living_room"),
    'bath_room':request.data.get("bath_room"),
    'bed_room':request.data.get("bed_room"),
    }
    return data

class PropertyAPIView(APIView):
    permission_classes=[permissions.AllowAny]
    parser_classes = (MultiPartParser, FormParser,JSONParser)
    
    
    
    def get(self,request,*args, **kwargs):
        properties=Property.objects.all()
        serializer=PropertySerializer(properties,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def post(self,request,*args,**kwargs):
        # print("-----------------------------",request,"----------------------------------")
        # data=get_form_data(request=request)
        
        serializedData = PropertySerializer(data=request.data)
        if serializedData.is_valid():
            serializedData.save()
            return Response(serializedData.data,status=status.HTTP_201_CREATED)
        return Response(serializedData.errors,status=status.HTTP_400_BAD_REQUEST)

class PropertyDetailAPIView(APIView):
    permission_classes=[permissions.AllowAny]
    
    def get(self,request,id,*args, **kwargs):
        # property=Property.objects.filter(id=id)
        property = get_object_or_404(Property, id=id)
        print("------------------>",property)
        serializer=PropertySerializer(property)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def delete(self,request,id,*args,**kwargs):
        if Property.objects.filter(id=id).exists():
            property=Property.objects.get(id=id)
            property.delete()
            return Response({"response":"Property Deleted"}, status=status.HTTP_200_OK)
        return Response(
            {"res":"Property doesn't exists"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    def patch(self,request,id,*args,**kwargs):
        if Property.objects.filter(id=id).exists():
            property=Property.objects.get(id=id)
            data=get_form_data(request=request)
            serializedData=PropertySerializer(instance=property,data=data,partial=True)
            if serializedData.is_valid():
                serializedData.save()
                return Response(serializedData.data,status=status.HTTP_200_OK)
        return Response({"res":"Property doesn't exists"},status=status.HTTP_400_BAD_REQUEST)
            


def get_user_properties(user,properties):
    print("------->",user)
    return {
        "id": str(user.id),
        "name": user.name,  # Replace 'name' with the actual attribute name in your User model
        "username": user.username,
        "email": user.email,
        "password": user.password,  # Note: Sending password in response is generally not recommended
        "properties": properties,
        }
    
class UserPropertyAPIView(APIView):
    permission_classes=[permissions.AllowAny]            

    def get(self,request,*args,**kwargs):
        user_id = getattr(request, 'user_id', None)
        user=User.objects.get(id=user_id)
        if user:
            properties=Property.objects.filter(user_id=user_id)
            user_serializer=UserSerializer(user)
            serialized_data=user_serializer.data
            if len(properties)>0:                
                property_serializer=PropertySerializer(properties,many=True)
                serialized_data["properties"]=property_serializer.data
            else:
                serialized_data["properties"]=[]
            return Response(serialized_data,status=status.HTTP_200_OK)
        return Response({"res":"User doesn't exists"},status=status.HTTP_400_BAD_REQUEST)



