from django.contrib import admin
from django.urls import path, include
from .views import *


urlpatterns = [
   path('problemlist', ProblemListAPI.as_view()),
   path('problem/<int:problem_id>', ProblemAPI.as_view()),
   path('userProblems/<int:user_id>', UserProblemAPI.as_view()),
   path('users/<int:user_id>', UserListAPI.as_view()),
   # path('users/<int:problem_id>', UserAPI),

   path('answers', AnswerListAPI.as_view()),
   path('answers/<int:answer_id>', AnswerAPI.as_view()),


   path('testcase', TestCaseListAPI.as_view()),
   path('testcase/<int:model_id>', TestCaseAPI.as_view()),

   path('preset', PresetListAPI.as_view()),
   path('preset/<int:user_id>/<int:problem_id>', PresetAPI.as_view()),

   path('login/', loginAPI.as_view()),
   path('testcase/test/', codeTestAPI)
   # path('testcase/test', ExecuteTestCaseAPI.as_view()),

]