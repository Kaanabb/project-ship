from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ShipWreck
from bson import ObjectId
from django.http import HttpResponse
from utils import callAllData
from .serializer import ShipWreckSerializer
from rest_framework import viewsets
import json


def index(request):
    return HttpResponse("<h1> App is running. </h1>")

def get_all_ships(request):
    getShips = callAllData()
    return HttpResponse(getShips)

def get_coords(request):
    getCoords = callAllData()
    return HttpResponse(getCoords)


class MyModelViewSet(viewsets.ViewSet):
    def list(self, request):
        try:
            # Fetch data using the callAllData function
            data = callAllData()
            # Convert JSON string back to Python objects
            data = json.loads(data)
            # Use the custom serializer to serialize the data
            serializer = ShipWreckSerializer(data=data, many=True)
            serializer.is_valid()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

#class WreckList(APIView):
#    def get(self, request):
#        ships = Ship.objects.all()
#        serializer = ShipSerializer(ships, many=True)
#        return Response(serializer.data)
#
#class WreckDetail(APIView):
#    def get(self, request, wreck_id):
#        ships = Ship.objects.get(_id=ObjectId(wreck_id))
#        serializer = ShipSerializer(ships)
#        return Response(serializer.data)
# Create your views here.
