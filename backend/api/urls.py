from django.contrib import admin
from django.urls import path, include
from .views import *


urlpatterns = [
   path('problemlist', ProblemListAPI.as_view()),
   path('problem/<int:problem_id>', ProblemAPI.as_view()),
   path('userProblems/<int:user_id>', UserProblemAPI.as_view()),
   path('users/<int:user_id>', UserListAPI.as_view()),
   path('users', UserRegisterAPI.as_view()),

   path('answers', AnswerListAPI.as_view()),
   path('answers/<int:problem_id>', AnswerAPI.as_view()),


   path('testcase', TestCaseListAPI.as_view()),
   path('testcase/<int:problem_id>', TestCaseAPI.as_view()),

   path('preset', PresetListAPI.as_view()),
   path('preset/<int:user_id>/<int:problem_id>/<int:preset_number>', PresetAPI.as_view()),

   path('login/', loginAPI.as_view()),
   path('testcase/test/', codeTestAPI.as_view())
   # path('testcase/test', ExecuteTestCaseAPI.as_view()),

]