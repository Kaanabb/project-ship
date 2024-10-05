import json
from pymongo import MongoClient
from django.http import JsonResponse
from bson.json_util import dumps
from bson import json_util
from bson import ObjectId



def callAllData():

    client = MongoClient("mongodb://localhost:27017/")
    try:
            database=client.get_database("db_ship_wrecks")
            watlews=database.get_collection("ship")
            
            #query= {"coordinates":"$all" }
            #watlewk=watlews.find(query)
            query = {
    "$and": [
        {"latdec": {"$gte": 0}},
        {"londec": {"$gte": 0}}
    ]
}
            watlewk=watlews.find(query)

            results=list(watlewk)
            
            json_results = json_util.dumps(results)
            #print(json_results)

            #for document in results:
            #print(json_results)
                #return JsonResponse(document)
           
    
            client.close()
            #return JsonResponse(json_results, safe=False)
            #return json.loads(json_util.dumps(json_results))
            return json_results

    except Exception as e:
        raise Exception("Unable to find the document due to the following error: ", e)
    
def callCoords():
    client = MongoClient("mongodb://localhost:27017/")
    database=client.get_database("db_ship_wrecks")
    collection=database.get_collection("ship")
    # Sadece coordinates alanını içeren tüm belgeleri bulma
    data = collection.find({"coordinates": {"$exists": True}})
    
    # Koordinatları bir listeye alma
    coordinates_list = [entry['coordinates'] for entry in data]
#json.
    # JSON formatında geri döndürme
    print (coordinates_list)
    return coordinates_list
#callAllData()