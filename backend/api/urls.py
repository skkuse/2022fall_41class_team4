from django.contrib import admin
from django.urls import path, include
from .views import *


urlpatterns = [
   path('problemlist/', ProblemListAPI),
   path('problem/<int:problem_id>', ProblemAPI),
   path('users/', UsersAPI),
   path('login/', loginAPI)
]