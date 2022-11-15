from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import BaseUserManager

# Create your models here.


class Problem(models.Model):
    id = models.BigAutoField(primary_key=True)# NOT NULL
    name = models.TextField(max_length=200)
    hardness = models.IntegerField()
    solved_ratio = models.FloatField()
    description = models.TextField()


class testCase(models.Model):
    id = models.BigAutoField(primary_key=True)
    testCase_in = models.TextField()
    testCase_out = models.TextField()
    problem = models.ForeignKey('Problem', related_name="testCases", on_delete=models.CASCADE)


#ref from https://www.coninggu.com/8
# custom user model 사용 시 UserManager 클래스와 
# create_user, create_superuser 함수가 정의되어 있어야 함
class UserManager(BaseUserManager):
	# 필수로 필요한 데이터를 선언
    def create_user(self, email, username, password):
        if not username:
            raise ValueError('Users must have an username')
        user = self.model(
            email=email,
            username=username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    # python manage.py createsuperuser 사용 시 해당 함수가 사용됨
    # def create_superuser(self, email, username, password):
    #     user = self.create_user(
    #         email=email,
    #         username=username,
    #         password=password
    #     )
    #     user.is_admin = True
    #     user.save(using=self._db)
    #     return user    
    def create_superuser(self, email, password, **kwargs):         
        user = self.model(email=email, is_staff=True, is_superuser=True, **kwargs)         
        user.set_password(password)         
        user.save()         
        return user

    

class User(AbstractUser):
    id = models.BigAutoField(primary_key=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=16)
    password = models.CharField(max_length=16)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    class Meta:
        db_table = 'user'
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS= []


class UserProblems(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_score = models.IntegerField()
    last_date = models.DateField(auto_now_add=True)
    user_code = models.TextField()
    user = models.ForeignKey('User', related_name="userProblem") 
    problem = models.ForeignKey('Problem', related_name='userProblem')
