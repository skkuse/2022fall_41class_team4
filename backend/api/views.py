from django.shortcuts import render
from django.db import models
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import *
from .serializer import *
from django.contrib.auth import authenticate, login,get_user_model
from django.contrib.auth.models import User


# Create your views here.
@api_view(['GET'])
def ProblemListAPI(request):
    problem_list = Problem.objects.all()
    serializer = ProblemListSerializer(problem_list, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def ProblemAPI(request,problem_id):
    problem = Problem.objects.get(id=problem_id)
    serializer = ProblemSerializer(problem)
    return Response(serializer.data)
    # test case info needed!

@api_view(['POST'])
def UsersAPI(request):
    if request.method == 'POST':
        reqData = request.data
        username = reqData['username']
        email = reqData['email']
        password = reqData['password']
        user = get_user_model().objects.create_user(username=username,email=email,password=password)
        #get_user_model().objects.get(id=id)
        if not user:
            return Response(reqData, status=status.HTTP_201_CREATED)
        return Response(reqData, status=status.HTTP_400_BAD_REQUEST)
        # serializer = UsersSerializer(data=reqData)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def loginAPI(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username,password=password)
        if user is not None:
            return Response(user, status=status.HTTP_201_CREATED)
        return Response("login failed", status=status.HTTP_400_BAD_REQUEST)