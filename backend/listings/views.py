from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Listing
from .serializers import ListingSerializer


class ListingAPIView(APIView):
    permission_classes=[permissions.AllowAny]
    
    def get(self,request,*args, **kwargs):
        listings=Listing.objects.all()
        serializer=ListingSerializer(listings,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def post(self,request,*args,**kwargs):
        data = {
        'name': request.data.get('name'), 
        'description': request.data.get('description'),
        'price':request.data.get("price"),
        'listing_type':request.data.get("listing_type") 
        }
        serializedData = ListingSerializer(data=data)
        # serializedData=ListingSerializer(request.data)
        
        if serializedData.is_valid():
            serializedData.save()
            return Response(serializedData.data,status=status.HTTP_201_CREATED)
        return Response(serializedData.errors,status=status.HTTP_400_BAD_REQUEST)

class ListingDetailAPIView(APIView):
    permission_classes=[permissions.AllowAny]
    
    def delete(self,request,id,*args,**kwargs):
        if Listing.objects.filter(id=id).exists():
            listing=Listing.objects.get(id=id)
            listing.delete()
            return Response({"response":"Listing Deleted"}, status=status.HTTP_200_OK)
        return Response(
            {"res":"Project doesn't exists"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    def patch(self,request,id,*args,**kwargs):
        if Listing.objects.filter(id=id).exists():
            listing=Listing.objects.get(id=id)
            serializedData=ListingSerializer(instance=listing,data=request.data,paritial=True)
            if serializedData.is_valid():
                serializedData.save()
                return Response(serializedData.data,status=status.HTTP_200_OK)
            return Response({"res":"Project doesn't exists"},status=status.HTTP_400_BAD_REQUEST)
            