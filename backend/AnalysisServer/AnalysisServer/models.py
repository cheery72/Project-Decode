from django.contrib.postgres.fields import ArrayField
from django.db import models

class Analysis(models.Model):
    name = models.CharField(max_length=30)
    age = models.IntegerField()
    location = ArrayField(
                models.CharField(max_length=10),
                models.CharField(max_length=10)
                )
    thrill = models.IntegerField()
    romance = models.IntegerField()
    reasoning = models.IntegerField()
    sfFantasy = models.IntegerField()
    adventure = models.IntegerField()
    comedy = models.IntegerField()
    crime = models.IntegerField()
    horror = models.IntegerField()
    adult = models.IntegerField()
    drama = models.IntegerField()