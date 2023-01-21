from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "username", "password"]
        write_only_fields = ["password"]
        read_only_fields = ["id"]
        required_fields = ["email", "username", "password"]
        hidden_fields = ["password"]
