from http import HTTPStatus
import source.endpoints as ep


TEST_CLIENT = ep.app.test_client()
COMMENTS = "/api/comments"
TASKS = "/api/tasks"

TOKEN_ERROR_MESSAGE = 'Access token is required'


def test_get_comments():
    resp_json = TEST_CLIENT.get(COMMENTS).get_json()
    assert isinstance(resp_json, dict)
    assert len(resp_json) > 0


def test_get_comments_without_token():
    response = TEST_CLIENT.get(COMMENTS)
    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert TOKEN_ERROR_MESSAGE in response.get_json()['error']


def test_get_tasks():
    resp_json = TEST_CLIENT.get(TASKS).get_json()
    assert isinstance(resp_json, dict)
    assert len(resp_json) > 0