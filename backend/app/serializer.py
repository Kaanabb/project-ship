from rest_framework import serializers
from .models import ShipWreck

class ShipWreckSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShipWreck
        fields = '__all__'