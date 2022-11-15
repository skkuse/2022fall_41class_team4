from django.shortcuts import render
from django.db import models
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import *
from .serializer import *
from django.contrib.auth import  login,get_user_model, authenticate
from django.contrib.auth.models import User
import docker
import backend 


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

@api_view(['POST', 'GET'])
def UsersAPI(request):
    if request.method == 'POST':
        reqData = request.data
        username = reqData['username']
        email = reqData['email']
        password = reqData['password']
        user = get_user_model().objects.create_user(username=username,email=email,password=password)
        serializer = UsersSerializer(user)
        #get_user_model().objects.get(id=id)
        if user:
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(reqData, status=status.HTTP_400_BAD_REQUEST)
        # serializer = UsersSerializer(data=reqData)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        pass

@api_view(['POST'])
def loginAPI(request):
    if request.method == "POST":
        reqData = request.data
        email = reqData['email'] #request.POST.get('email') #['email']
        #print(f'user email = {email}')
        password = reqData['password']
        user = authenticate(request, username=email, password=password)
        serializer = UsersSerializer(user)
        if user :
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(f"login failed", status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def codeTestAPI(request):
    if request.method == "POST":
        #get user code from post req body
        reqData = request.data
        userCode = reqData['userCode']

        #make user code py file
        f = open("./userCodeTest/test.py", 'w')
        f.write(userCode)
        f.close()

        #save user code to DB
        

        #make docker container
        client = docker.from_env()
        client.containers.run('image')

        #update userProblem info
        
