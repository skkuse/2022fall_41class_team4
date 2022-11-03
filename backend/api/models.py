from django.db import models

# Create your models here.


class Problem(models.Model):
    id = models.BigAutoField(primary_key=True)# NOT NULL
    name = models.TextField(max_length=200)
    hardness = models.IntegerField()
    solved_ratio = models.FloatField()



