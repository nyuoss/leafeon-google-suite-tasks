import requests


def get_tasks_from_api(access_token):
    try:
        # Fetch tasks from Google Tasks API
        headers = {'Authorization': f'Bearer {access_token}'}
        response = requests.get('https://www.googleapis.com/tasks/v1/lists/@default/tasks', headers=headers)
        response.raise_for_status()
        data = response.json()

        tasks = [{'title': task['title'],
                  'note': task.get('notes', '')}
                 for task in data.get('items', [])]
        return tasks
    except Exception as e:
        raise RuntimeError(f"Failed to fetch tasks: {str(e)}")
