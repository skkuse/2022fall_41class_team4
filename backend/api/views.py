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
from rest_framework.views import APIView
from api.models import User as Custom_User


# todo: 에러코드 구체화
# todo: try catch 예외처리
# todo: CustomUser 바꾸기

class AnswerListAPI(APIView):
    # def get(self, request):
    #     answer_list = Answer.objects.all()
    #     serializer = ProblemListSerializer(answer_list, many=True)
    #     return Response(serializer.data)

    # 문제 답안 등록
    def post(self, request):
        serializer = AnswerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AnswerAPI(APIView):
    # 문제 답안 조회
    def get(self, request, answer_id):
        model = Answer.objects.get(id=answer_id)
        serializer = AnswerSerializer(model)
        return Response(serializer.data)

    # 문제 답안 수정
    def patch(self, request, answer_id):
        model = Answer.objects.get(id=answer_id)
        serializer = AnswerSerializer(model, data=request.data, partial=True)
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 문제 답안 삭제
    def delete(self, request, answer_id):
        model = Answer.objects.get(id=answer_id)
        model.delete()
        return Response({}, status=status.HTTP_204_NO_CONTENT)


class TestCaseListAPI(APIView):
    # 테스트 케이스 등록
    def post(self, request):
        serializer = TestCaseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TestCaseAPI(APIView):
    # 테스트 케이스 조회
    def get(self, request, problem_id):
        problem = Problem.objects.get(id=problem_id)
        model = Answer.objects.get(problem=problem)
        serializer = AnswerSerializer(model)
        return Response(serializer.data)

    # 테스트 케이스 수정
    def patch(self, request, testcase_id):
        model = TestCase.objects.get(id=testcase_id)
        serializer = AnswerSerializer(model, data=request.data, partial=True)
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 문제 답안 삭제
    def delete(self, request, testcase_id):
        model = TestCase.objects.get(id=testcase_id)
        model.delete()
        return Response({}, status=status.HTTP_204_NO_CONTENT)



class PresetListAPI(APIView):
    # def get(self, request):
    #     problem_list = Problem.objects.all()
    #     serializer = ProblemSerializer(problem_list, many=True)
    #     return Response(serializer.data)

    # 사용자 코드 프리셋 등록
    def post(self, request):
        serializer = PresetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PresetAPI(APIView):
    # 특정 문제에 대한 사용자 코드 프리셋 조회
    def get(self, request, user_id, problem_id):
        preset = Preset.objects.get(user_id=user_id, problem_id=problem_id)
        serializer = PresetSerializer(preset)
        return Response(serializer.data)

    # 사용자 최종 수정 코드 등록
    def post(self, request, user_id, problem_id):
        serializer = PresetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # print(serializer.data)
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ProblemListAPI(APIView):
    def get(self, request):
        problem_list = Problem.objects.all()
        serializer = ProblemSerializer(problem_list, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProblemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProblemAPI(APIView):
    def get(self, request, problem_id):
        problem = Problem.objects.get(id=problem_id)
        serializer = ProblemSerializer(problem)
        return Response(serializer.data)

    def patch(self, request, problem_id):
        model = Problem.objects.get(id=problem_id)
        serializer = ProblemSerializer(model, data=request.data, partial=True)
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, problem_id):
        model = Problem.objects.get(id=problem_id)
        model.delete()
        return Response({}, status=status.HTTP_204_NO_CONTENT)


class UserProblemAPI(APIView):
    # 사용자에 대한 문제 정보 조회
    def get(self, request, user_id):
        # from api.models import User as Custom_User
        user = Custom_User.objects.get(id=user_id)
        problem_li = UserProblems.objects.filter(user=user).values_list('problem')
        problems = Problem.objects.filter(id__in=problem_li)
        serializer = ProblemSerializer(problems, many=True)
        return Response(serializer.data)



class UserListAPI(APIView):
    # 사용자 조회
    def post(self, request, user_id):
        user = Custom_User.objects.get(id=user_id)
        serializer = UsersSerializer(user)
        if serializer.is_valid():
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# @api_view(['POST', 'GET'])
class UserRegisterAPI(APIView):
    def post(self, request):
        # 사용자 등록 (회원가입)
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


class loginAPI(APIView):
    # 사용자 로그인
    def post(self, request):
        reqData = request.data
        email = reqData['email']  # request.POST.get('email') #['email']
        # print(f'user email = {email}')
        password = reqData['password']
        user = authenticate(request, username=email, password=password)
        serializer = UsersSerializer(user)
        if user:
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(f"login failed", status=status.HTTP_400_BAD_REQUEST)
    


#
# @api_view(['POST'])
# def loginAPI(request):
#     if request.method == "POST":
#         reqData = request.data
#         email = reqData['email'] #request.POST.get('email') #['email']
#         #print(f'user email = {email}')
#         password = reqData['password']
#         user = authenticate(request, username=email, password=password)
#         serializer = UsersSerializer(user)
#         if user :
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(f"login failed", status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def codeTestAPI(request):
    if request.method == "POST":
        #init docker client:
        client = docker.from_env()

        #get user code from post req body
        reqData = request.data
        userCode = reqData['userCode']

        #make user code py file
        f = open("./userCodeTest/test.py", 'w')
        f.write(userCode)
        f.close()

        #build docker file


        #save user code to DB
        

        #make docker container
        client.containers.run('image')

        #update userProblem info
        
