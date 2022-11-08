from django.db import models

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


class Users(models.Model):
    user_id = models.BigAutoField(primary_key=True)
    user_name = models.TextField(max_length=50)
    user_email = models.TextField(max_length=50)