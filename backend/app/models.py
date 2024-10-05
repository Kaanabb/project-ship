from django.db import models
from pymongo import MongoClient
from utils import callAllData
from django.db import models
from bson import ObjectId

class ShipWreck(models.Model):
    # Use ObjectId as primary key
    id = models.CharField(max_length=24, primary_key=True, editable=False)
    recrd = models.CharField(max_length=255, blank=True, null=True)
    vesslterms = models.CharField(max_length=255, blank=True, null=True)
    feature_type = models.CharField(max_length=255)
    chart = models.CharField(max_length=255)
    latdec = models.FloatField()
    londec = models.FloatField()
    gp_quality = models.CharField(max_length=255, blank=True, null=True)
    depth = models.CharField(max_length=255, blank=True, null=True)
    sounding_type = models.CharField(max_length=255, blank=True, null=True)
    history = models.CharField(max_length=255, blank=True, null=True)
    quasou = models.CharField(max_length=255, blank=True, null=True)
    watlev = models.CharField(max_length=255)
    coordinates = models.JSONField()

    def __str__(self):
        return f'{self.feature_type} at {self.latdec}, {self.londec}'
    

    

# Create your models here.
