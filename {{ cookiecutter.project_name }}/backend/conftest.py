import pytest
from model_bakery import baker
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import AccessToken

pytestmark = pytest.mark.django_db


@pytest.fixture()
def api_client():
    return APIClient()


@pytest.fixture()
def get_authenticated_client(api_client):
    def _get_authenticated_client(user):
        token = AccessToken.for_user(user=user)
        api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        return api_client

    return _get_authenticated_client


@pytest.fixture()
def user(settings):
    return baker.make(settings.AUTH_USER_MODEL)
