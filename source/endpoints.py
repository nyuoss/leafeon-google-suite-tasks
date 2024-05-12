# import source.component.component as component

from flask import Flask, request, jsonify
import requests
import re
from flask_cors import CORS  # Import CORS from flask_cors module


app = Flask(__name__)
CORS(app)  # Apply CORS to your Flask app


# CLIENT_ID = 'your_client_id'
# CLIENT_SECRET = 'your_client_secret'


# Function to detect user tags
def is_user_tagged(comment, username):
    pattern = f"@{re.escape(username)}\\b"
    if re.search(pattern, comment):
        return True
    else:
        return False

# Function to detect email tags
def is_email_tagged(comment, email):
    pattern = f"{re.escape(email)}"
    if re.search(pattern, comment):
        return True
    else:
        return False

# Function to filter comments
def filter_comments(comments, username=None, keyword=None, email=None):
    filtered_comments = []
    for comment in comments:
        include_comment = True
        if username:
            if not is_user_tagged(comment, username):
                include_comment = False
        if keyword:
            if keyword.lower() not in comment.lower():
                include_comment = False
        if email:
            if not is_email_tagged(comment, email):
                include_comment = False
        if include_comment:
            filtered_comments.append(comment)
    return filtered_comments

@app.route('/api/comments')
def get_comments():
    access_token = request.args.get('access_token')
    username = request.args.get('username')  # Get the username from the query parameters
    keyword = request.args.get('keyword')  # Get the keyword from the query parameters
    email = request.args.get('email')  # Get the email from the query parameters

    if not access_token:
        return jsonify({'error': 'Access token is required'}), 400

    try:
        # Fetch comments from Google Drive API
        headers = {'Authorization': f'Bearer {access_token}'}
        response = requests.get('https://www.googleapis.com/drive/v3/files',
                                headers=headers)
        response.raise_for_status()
        data = response.json()

        comments = []
        for file in data['files']:
            if file['mimeType'] == 'application/vnd.google-apps.document':
                file_id = file['id']
                comments_response = requests.get(
                    f'https://www.googleapis.com/drive/\
                        v2/files/{file_id}/comments',
                    headers=headers)
                comments_response.raise_for_status()
                comments_data = comments_response.json()
                comments.extend([{
                    'content': comment['content'],
                    'author': comment['author']['displayName'],
                    'fileName': file['name']
                } for comment in comments_data['items']])

        # Filter comments based on username, keyword, and email
        filtered_comments = filter_comments(
            [comment['content'] for comment in comments],
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
        # Fetch tasks from Google Tasks API
        headers = {'Authorization': f'Bearer {access_token}'}
        response = requests.get('https://www.googleapis.com/tasks/\
                                v1/lists/@default/tasks', headers=headers)
        response.raise_for_status()
        data = response.json()

        tasks = [{'title': task['title'],
                  'note': task.get('notes', '')}
                 for task in data.get('items', [])]
        return jsonify({'tasks': tasks}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
