import re
import requests


# Function to detect email tags
def is_email_tagged(comment, email):
    pattern = f"{re.escape(email)}"
    return bool(re.search(pattern, comment))


# Function to filter comments
def filter_comments(comments, email=None):
    filtered_comments = []
    for comment in comments:
        include_comment = True
        if email and not is_email_tagged(comment, email):
            include_comment = False
        if include_comment:
            filtered_comments.append(comment)
    return filtered_comments


def get_comments_from_api(access_token, email=None):
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
                comments_response = requests.get(
                    f'https://www.googleapis.com/drive/v2/files/{file_id}/comments', headers=headers)
                comments_response.raise_for_status()
                comments_data = comments_response.json()
                comments.extend([{
                    'content': comment['content'],
                    'author': comment['author']['displayName'],
                    'fileName': file['name']} for comment in comments_data['items']])

        # Filter comments based on username, keyword, and email
        filtered_comments = filter_comments(
            comments,
            email=email
        )
        return filtered_comments
    except Exception as e:
        raise RuntimeError(f"Failed to fetch comments: {str(e)}")
