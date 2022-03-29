from rest_framework import serializers
from .models import Analysis

class AnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Analysis
        fields = ('id','name','age','location','thrill','romance','reasoning','sfFantasy','adventure','comedy','crime','horror','adult','drama')