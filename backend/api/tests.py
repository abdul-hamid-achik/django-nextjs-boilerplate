import pytest
from rest_framework import status
from rest_framework.reverse import reverse


@pytest.mark.django_db
def test_health_endpoint(client):
    response = client.get(reverse("health_check:health_check_home"))
    assert response.status_code == status.HTTP_200_OK
    assert "System status" in response.content.decode("utf-8")


def test_schema_endpoint(client):
    response = client.get(reverse("openapi-schema"))
    assert response.status_code == status.HTTP_200_OK
    assert "API" in response.content.decode("utf-8")
    assert "openapi" in response.content.decode("utf-8")
    assert "paths" in response.content.decode("utf-8")
    assert "components" in response.content.decode("utf-8")


def test_docs_endpoint(client):
    response = client.get(reverse("docs"))
    assert response.status_code == status.HTTP_200_OK
    assert "ReDoc" in response.content.decode("utf-8")
