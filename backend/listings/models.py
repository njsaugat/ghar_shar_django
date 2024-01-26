from django.db import models
from rest_framework import serializers
from rest_framework.views import APIView
# Create your models here.
class Listing(models.Model):
    LISTING_RENT="R"
    LISTING_SALE="S"

    LISTING_CHOICES=[
        (LISTING_RENT,'Rent'),
        (LISTING_SALE,'Sale'),
    ]

    name=models.CharField(max_length=100,blank=False,null=False)
    description=models.TextField(blank=True,null=True)
    price=models.DecimalField(max_digits=10,decimal_places=2)
    listing_type=models.CharField(max_length=1,choices=LISTING_CHOICES,default=LISTING_RENT)
    # image
    
    
class Product(models.Model):
    name=models.CharField()
    price=models.IntegerField()
    
    
    def discounted_price(self, discount_percentage):
        discount_amount=(discount_percentage/100)*self.price
        return round(self.price-discount_amount,2)
    

class ProductSerializer(serializers.ModelSerializer):
    
    disounted_price=serializers.SerializerMethodField()
    discount_percentage=serializers.IntegerField(default=10,write_only=True)
    class Meta:
        model=Product
        field=["id","name","price","discounted_price"]
        
    def get_discounted_price(self,obj):
        discount_percentage=self.context.get('discount_percentage',10)
        return obj.discounted_price(discount_percentage)
        
        
class ProductListView(APIView):
    # assuming the url comes with url param and discount value set
    def get_serializer_context(self):
        context=super().get_serializer_context()
        context.update({
            'discount_percentage':self.request.query_params.get('discount',10)
        })
        return context;