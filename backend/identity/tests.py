import pytest
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.reverse import reverse

User = get_user_model()


@pytest.mark.it("/health endpoint works")
def test_health_endpoint(client):
    response = client.get(reverse("health_check:health_check_home"))
    assert response.status_code == status.HTTP_200_OK
    assert "System status" in response.content.decode("utf-8")


@pytest.mark.it("/schema endpoint works")
def test_schema_endpoint(client):
    response = client.get(reverse("openapi-schema"))
    assert response.status_code == status.HTTP_200_OK
    assert "API" in response.content.decode("utf-8")
    assert "openapi" in response.content.decode("utf-8")
    assert "paths" in response.content.decode("utf-8")
    assert "components" in response.content.decode("utf-8")


@pytest.mark.it("/docs endpoint works")
def test_docs_endpoint(client):
    response = client.get(reverse("docs"))
    assert response.status_code == status.HTTP_200_OK
    assert "ReDoc" in response.content.decode("utf-8")


@pytest.mark.it("/registration endpoint works")
def test_register_endpoint(client, faker):
    email = faker.email()
    response = client.post(
        reverse("user-list"),
        data={
            "email": email,
            "username": faker.user_name(),
            "password": faker.password(),
        },
    )
    assert response.status_code == status.HTTP_201_CREATED
    assert "email" in response.data
    assert "username" in response.data
    assert User.objects.filter(email=email).exists()


@pytest.mark.it("/registration endpoint fails when not providing a password")
def test_register_endpoint_failure(client, faker):
    email = faker.email()
    response = client.post(
        reverse("user-list"),
        data={"email": email, "username": faker.user_name(), "password": ""},
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "password" in response.data
    assert "This field may not be blank." in response.data["password"][0]
    assert User.objects.filter(email=email).exists() is False


@pytest.mark.it("/user endpoint works when authenticated")
def test_user_endpoint(get_authenticated_client, user):
    client = get_authenticated_client(user)
    response = client.get(reverse("user-detail", args=[user.pk]))

    assert response.status_code == status.HTTP_200_OK


@pytest.mark.it("/user endpoint fails when not authenticated")
def test_user_endpoint_failure(client, user):
    response = client.get(reverse("user-detail", args=[user.pk]))
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
