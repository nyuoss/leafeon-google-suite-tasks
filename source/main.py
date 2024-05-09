# import source.component.component as component


# def hello():
#     print("Hello World!")
#     print("2 + 2 = ", component.add(2, 2))

from flask import Flask, request, jsonify
import requests
from flask_cors import CORS  # Import CORS from flask_cors module


app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "*"}})

# CLIENT_ID = 'your_client_id'
# CLIENT_SECRET = 'your_client_secret'

@app.route('/api/comments')
def get_comments():
    access_token = request.args.get('access_token')
    if not access_token:
        return jsonify({'error': 'Access token is required'}), 400
    
    try:
        # Fetch comments from Google Drive API
        headers = {'Authorization': f'Bearer {access_token}'}
        response = requests.get('https://www.googleapis.com/drive/v3/files', headers=headers)
        response.raise_for_status()
        data = response.json()

        comments = []
        for file in data['files']:
            if file['mimeType'] == 'application/vnd.google-apps.document':
                file_id = file['id']
                comments_response = requests.get(f'https://www.googleapis.com/drive/v2/files/{file_id}/comments', headers=headers)
                comments_response.raise_for_status()
                comments_data = comments_response.json()
                comments.extend([{
                    'content': comment['content'],
                    'author': comment['author']['displayName'],
                    'fileName': file['name']
                } for comment in comments_data['items']])
        
        return jsonify({'comments': comments}), 200
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
        response = requests.get('https://www.googleapis.com/tasks/v1/lists/@default/tasks', headers=headers)
        response.raise_for_status()
        data = response.json()

        tasks = [{'title': task['title'], 'note': task.get('notes', '')} for task in data.get('items', [])]
        return jsonify({'tasks': tasks}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
