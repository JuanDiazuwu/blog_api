from fastapi.testclient import TestClient

from app import app

client = TestClient(app)

def test_root_endpoint():
    respose = client.get('/')
    assert respose.status_code == 200
    assert respose.json() == "Server is running!!!"