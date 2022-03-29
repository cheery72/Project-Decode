from django.http.response import JsonResponse
from .models import Analysis
from .serializer import AnalysisSerializer
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from .utils import get_collection_handle, get_db_handle
import pymongo

# ViewSets define the view behavior.
class AnalysisViewSet(viewsets.ModelViewSet):
    queryset = Analysis.objects.all()
    serializer_class = AnalysisSerializer

@csrf_exempt
@api_view(['GET'])
def analysis_list(request):
    users = pymongo.MongoClient("j6c203.p.ssafy.io",27017).escape.users
    theme = pymongo.MongoClient("j6c203.p.ssafy.io",27017).escape.theme
    review = pymongo.MongoClient("j6c203.p.ssafy.io",27017).escape.review

    result = theme.find()
    for r in result:
        print(r)
    
    # query_set = Analysis.objects.all()
    # serializer = AnalysisSerializer(query_set, many=True)
    db_handle, mongo_client = get_db_handle('escape', 'j6c203.p.ssafy.io', 27017, 'escape', 'decode')
    collection_handle = get_collection_handle(db_handle, 'escape')
    # data = list(result.values())
    return JsonResponse(result, safe=False)

    # tutorial_serializer = AnalysisSerializer(Analysis) 
    # return JsonResponse(tutorial_serializer.data) 

# @api_view(['GET'])
# def analysis_list(request):
    # analysis = Analysis.objects.filter(published=True)
        
    # if request.method == 'GET': 
    #     analysis_serializer = AnalysisSerializer(analysis, many=True)
    #     return JsonResponse(analysis_serializer.data, safe=False)

# @csrf_exempt
# def analysis_recommend(request):
#     if request.method == 'GET':
#         query_set = Analysis.objects.all()
#         serializer = AnalysisSerializer(query_set, many=True)
#         return JsonResponse(serializer.data, safe=False)
        