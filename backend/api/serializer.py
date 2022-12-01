from django.db import models

from rest_framework import serializers
from .models import *



#todo: base 앞에 붙이느냐 - 네이밍
class testCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = testCase
        fields = ('id', 'testCase_in', 'testCase_out')
        

class ProblemSerializer(serializers.ModelSerializer):
    # testCases = testCaseSerializer(many=True)
    class Meta:
        model = Problem
        fields = ('id', 'name', 'hardness', 'solved_ratio', 'description', 'restrictions')



# todo: problem ? problem_id ?
class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('id', 'problem', 'answer_code')


class testCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = testCase
        fields = ('id', 'testCase_in', 'testCase_out', 'problem')

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password','is_active','is_admin')

class UserProblemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProblems
        fields = ('id', 'last_date', 'user_code', 'problem_id','user_id','user_score')

class PresetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preset
        fields = ('id', 'user_id', 'problem_id', 'code', 'preset_number')