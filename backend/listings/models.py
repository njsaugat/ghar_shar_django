from django.db import models

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