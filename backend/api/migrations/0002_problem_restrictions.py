# Generated by Django 3.2.16 on 2022-11-30 08:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='problem',
            name='restrictions',
            field=models.TextField(null=True),
        ),
    ]
