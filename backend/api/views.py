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
import os
import backend
from rest_framework.views import APIView
from api.models import User as Custom_User
import json


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
        serializer = testCaseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TestCaseAPI(APIView):
    # 테스트 케이스 조회
    def get(self, request, problem_id):
        problem = Problem.objects.get(id=problem_id)
        model = testCase.objects.filter(problem=problem)
        serializer = testCaseSerializer(model, many=True)
        return Response(serializer.data)

    # 테스트 케이스 수정
    def patch(self, request, testcase_id):
        model = testCase.objects.get(id=testcase_id)
        serializer = testCaseSerializer(model, data=request.data, partial=True)
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 문제 답안 삭제
    def delete(self, request, testcase_id):
        model = testCase.objects.get(id=testcase_id)
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
    def get(self, request, user_id):
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
        password = reqData['password']
        print(f'user email = {email}\nuser password = {password}')
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

#@api_view(['POST'])
class codeTestAPI(APIView):
    def post(self, request):
        if request.method == "POST":
            #init docker client:
            client = docker.from_env()

            #get user code from post req body
            reqData = request.data
            userCode = reqData['user_code']
            user_id = reqData['user_id']
            problem_id = reqData['problem_id']

            #make user code py file
            print("\n\nWorking on " +os.getcwd()+"\n\n")
            f = open("./api/userCodeTest/test.py", 'w')
            f.write(userCode)
            f.close()

            #get the problem's testcase
            problem = Problem.objects.get(id=problem_id)
            user = get_user_model().objects.get(id=user_id)
            testCases = testCase.objects.filter(problem=problem)
            userProblem, created = UserProblems.objects.get_or_create(user=user, problem=problem)

            #generate unittest code
            testcase_file = open("./api/userCodeTest/testcases_run.py", 'w')
            testcase_init_list = ["import unittest\n", "import test\n","class solutionTest(unittest.TestCase):\n"]
            testcase_file.writelines(testcase_init_list)
            
            for i, test_case in enumerate(testCases):
                testcase_file.write(f"\tdef test{i}(self):\n")
                testcase_file.write(f"\t\ttry:\n")
                testcase_file.write(f"\t\t\tself.assertEqual(test.solution({test_case.testCase_in[1:-1]}),{test_case.testCase_out[1:-1]})\n")
                testcase_file.write(f"\t\texcept AssertionError as e:\n")
                testcase_file.write(f"\t\t\tprint(f'fail:{i}') \n")
                
            
            testcase_close_list = ["if __name__ == '__main__':\n", "\tunittest.main()\n"]
            testcase_file.writelines(testcase_close_list)
            testcase_file.close()

            #build docker file
            dockerfile_path='./api/userCodeTest/Dockerfile'
            dockerfile_dir = os.path.dirname(dockerfile_path)

            test_docker_img, json_file = client.images.build(path=dockerfile_dir, dockerfile="Dockerfile")

            #make docker container
            response=""
            fail_count=0
            fail_list=[]
            try:
                response = client.containers.run(test_docker_img,stdout=True,stderr=True, remove=True)
                response = response.decode('utf-8')
                responses = response.split('\n')
                for res in responses:
                    if "fail" in res:
                        fail_count += 1
                        fail_list.append(res.split(":")[1])
                
                userProblem.user_code = userCode
                userProblem.user_score = (len(testCases)-fail_count) / len(testCases)
                serializer =UserProblemsSerializer(userProblem)
                return Response(serializer.data, status=status.HTTP_200_OK)
                        
                print(responses)
            except docker.errors.ContainerError as error:
                #responses = error.split("\n")
                #print(responses)
                # print(response)
                print("error")
            
            response_dict = {}
            response_dict["result"] = str(response)
            #response = str(response)
            print(response)

            #save user code to DB
            
            

            #update userProblem info
            
            
            
