from django.db import models

from rest_framework import serializers
from .models import Problem



#todo: base 앞에 붙이느냐 - 네이밍
class ProblemListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ('id', 'name', 'hardness', 'solved_ratio')