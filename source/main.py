from flask import Flask, request, jsonify
from flask_cors import CORS
from source.comments_component.comments import get_comments_from_api
from source.tasks_component.tasks import get_tasks_from_api

app = Flask(__name__)
CORS(app)


@app.route('/api/comments')
def get_comments():
    access_token = request.args.get('access_token')
    username = request.args.get('username')
    keyword = request.args.get('keyword')
    email = request.args.get('email')

    if not access_token:
        return jsonify({'error': 'Access token is required'}), 400

    try:
        filtered_comments = get_comments_from_api(
                                access_token,
                                username=username,
                                keyword=keyword,
                                email=email
                            )
        return jsonify({'comments': filtered_comments}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/tasks')
def get_tasks():
    access_token = request.args.get('access_token')
    if not access_token:
        return jsonify({'error': 'Access token is required'}), 400

    try:
        tasks_list = get_tasks_from_api(access_token)
        return jsonify({'tasks': tasks_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
