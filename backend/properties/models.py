from django.db import models
from django.core.validators import MaxValueValidator

# Create your models here.
class Property(models.Model):
    PROPERTY_RENT="R"
    PROPERTY_SALE="S"

    PROPERTY_CHOICES=[
        (PROPERTY_RENT,'Rent'),
        (PROPERTY_SALE,'Sale'),
    ]

    name=models.CharField(max_length=100,blank=False,null=False)
    location=models.TextField(blank=True,null=True)
    description=models.TextField(blank=True,null=True)
    is_furnished=models.BooleanField()
    price=models.DecimalField(max_digits=10,decimal_places=2)
    property_type=models.CharField(max_length=1,choices=PROPERTY_CHOICES,default=PROPERTY_RENT)
    living_room=models.IntegerField(validators=[MaxValueValidator(99)])
    bath_room=models.IntegerField(validators=[MaxValueValidator(99)])
    bed_room=models.IntegerField(validators=[MaxValueValidator(99)])
    # image