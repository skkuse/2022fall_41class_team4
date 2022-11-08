from django.db import models

from rest_framework import serializers
from .models import *



#todo: base 앞에 붙이느냐 - 네이밍
class testCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = testCase
        fields = ('id', 'testCase_in', 'testCase_out')
        
class ProblemListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ('id', 'name', 'hardness', 'solved_ratio')

class ProblemSerializer(serializers.ModelSerializer):
    testCases = testCaseSerializer(many=True)
    class Meta:
        model = Problem
        fields = ('id', 'name', 'description', 'testCases')

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('user_id', 'user_name', 'user_email')
