from django.shortcuts import render
from django.db import models
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializer import *


# Create your views here.
@api_view(['GET'])
def ProblemListAPI(request):
    problem_list = Problem.objects.all()
    serializer = ProblemListSerializer(problem_list, many=True)
    return Response(serializer.data)

