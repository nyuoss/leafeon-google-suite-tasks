# Google Suite Tasks Aggregator
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)  [![CircleCI](https://dl.circleci.com/status-badge/img/circleci/42j8atdDzgh7tmZyp3BEAx/NKkbAnw1PXUdhc74vJtLL7/tree/main.svg?style=shield&circle-token=314b77a67a9ca6178d4e8330c76aa0736e30c210)](https://dl.circleci.com/status-badge/redirect/circleci/42j8atdDzgh7tmZyp3BEAx/NKkbAnw1PXUdhc74vJtLL7/tree/main)

Team: Leafeon  
New York University, Open Source and Professional Software Development, Spring 2024   

## Live App
[Leafeon Google Suite Tasks Aggregator](https://leafeon.s3.amazonaws.com/index.html)

## Demo Video
Watch the video in this repo called `DemoVideo.mp4` to see how our app works!

## Primary Goal
The primary goal of the Leafeon Google Tasks Aggregator project is to develop a task management tool that addresses deficiencies in Google Suite’s task system, specifically targeting the lack of assigned comment tracking within Google Docs, Sheets, and Slides. The objective is to create a service that aggregates all assigned comments and tasks across the Google Suite into a single, user-friendly interface, enhancing productivity and convenience for users within the Google ecosystem.  

## Features
- Login with Google
  - Authenticate yourself with any account that you use for Google Workspace.
- View Google Docs Comments
  - Once logged in, you can view all of the comments in all of your Google Docs files in one place.
- View Google Tasks
  - Once logged in, you can view all of your Google Tasks.
- Convert Comments to Tasks
  - By clicking the Create Task + button next to any comment, you can create a Google Task based on that comment, populated with the comment's information.

## Future Work
With further development time, the following features from the proposal could be added:
- Expand support to other Google Workspace apps (Google Sheets, Google Slides, etc.)
- Potentially filter to only assigned comments, though we found that we preferred seeing all comments with the potential to convert to Tasks.
- Improve UX by only displaying a certain number of comments or tasks at a time and using a scroll bar or "load more" buttons. 
- Improve reactivity by removing the need to ever reload the page. 
- Include functionality to edit/delete comments or tasks inside of our application
- Include functionality to notify users of tasks
- Include functionality to directly create a new blank task from our application (currently can only create a task from a comment).

## Installation & Running Locally
1. Clone this repository.
2. In the root directory, run `pdm install`. If you receive any import or module errors, try deleting the `pdm.lock` and `.pdm-python` files before running the command again.
Importantly, these include modules/packages like flask (for the backend), pytest, flake8, black, gunicorn (for Heroku), and coverage.  
3. Run `npm install --force` to install frontend dependencies.
Most importantly, these include:
`gapi-script`: for using google apis
`react`: for using react libraries
`tailwindcss`: CSS Framework for UI
`react-google-login`:  For user authentication
4. To run this locally, you will need your own Google Console account. [Create a project](https://developers.google.com/workspace/guides/create-project), and then create a client id (for oauth). [Enable Google Drive API and Google Tasks API](https://developers.google.com/workspace/guides/enable-apis). Provide `http://localhost:3000` as the Authorized Redirect URI. This is where the frontend will open. Once you have the client id, replace the `clientId` variable `GoogleDocsContext.js`. 
5. To run locally, navigate to the `GoogleDocsContext.js` file. In both the `fetchComments` and `fetchTasks` functions, there is a line that starts with `const response = await fetch(`
Replace the `https://leafeon-2-8bd3e618e164.herokuapp.com/` part of the url with `http://127.0.0.1:5000/` to deploy the backend locally on port 5000.  
6. Navigate to the `source` directory.
7. Run `python main.py` to start the backend server.
Some changes had to be made for the CircleCI environment that do not always act the same locally. If you receive a `ModuleNotFoundError: No module named 'source'`, in the `main.py` imports delete the preceding `source.`s to directly import the module. This change was added for pytest to run successfully, but is known to cause issues locally.
8. Navigate to the `source/frontend` directory.
9. Run `npm start` to start the frontend. This should launch a window running the app in your browser at the address `http://localhost:3000`.

## Usage
1. Sign In
Click on the Google "Login" button in the top right corner and follow the prompts. If the app is unverified, you can continue **at your own risk**.
2. Reload the page, and give it a few seconds to think and load your comments and tasks.
3. If you want to create a task from a comment, click the "Create Task +" button next to the comment. You should be able to immediately see the new task.
4. When you're done, you can click the Google "Logout" button in the top right corner.

## Contributing
If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Clone the repository to your local machine.
3. Install PDM: `pip install pdm`.
4. Follow the Installation instructions but *ignore any changes related to local development*.
5. Create a new branch for your feature/fix: `git checkout -b feature-name`.
6. For any new packages/modules, check our comments on the tools used in this project such as PDM and npm.
7. Make your changes and ensure they pass all tests and checks
   - run `pdm run pytest source/tests` for testing
   - run `pdm run flake8 source` for linting
   - run `pdm run black .` for code formatting
8. Commit your changes: `git commit -m 'Add new feature'`.
9. Push to the branch: `git push origin feature-name`.
10. Submit a pull request.

Please make sure to update tests as appropriate.

## PDM
This repository uses [PDM](https://pdm-project.org/latest/) to manage Python packages and dependencies.  
The configuration can be found in the `pyproject.toml` file. To add or remove dependencies, check the PDM documentation for [managing dependencies](https://pdm-project.org/latest/usage/dependency/).

## Heroku
This project uses Heroku to deploy its backend. Heroku requires a `requirements.txt` file. If any updates are made to PDM, make sure to migrate them to the `requirements.txt` file with the following command:  
`pdm export -o requirements.txt --without-hashes`
Our Heroku dashboard can be found [here](https://dashboard.heroku.com/apps/leafeon-2).

## npm
This repository [npm](https://docs.npmjs.com/) to manage frontend javascript packages.  
In the project directory, you can run:
`npm install --force`
All of the packages are already installed through `package.json`. Any other packages can be installed using:
`npm install <package name>`  

## Flake8 & Black
This repository uses [Flake8](https://flake8.pycqa.org/en/latest/) linting as its static analysis tool to check the code against various style rules and detect potential issues, such as syntax errors, unused variables, or overly complex code.  
[Black](https://black.readthedocs.io/en/stable/) is then used for code formatting.  
To modify rules for tools like flake8 and black, check the configurations under `[tool.flake8]` and `[tool.black]` in the `pyproject.toml` file.

## Pytest
This repository uses [Pytest](https://docs.pytest.org/en/8.0.x/) for code testing.  
Pytest is set to run on the `source/tests` directory in the "Run tests" run step of the `.circleci/config.yml` file.

## CircleCI
This repository uses [CircleCI](https://circleci.com/) for continuous integration.  
CircleCI will automatically set up python with PDM, install default and development dependencies, run tests with pytest, perform static analysis with flake8, and apply black formatting. It deploys the backend to Heroku and the frontend to an AWS s3 bucket. To modify these build steps, check the configuration in the `.circleci/config.yml` file.  
Check our CircleCI build logs [here](https://app.circleci.com/pipelines/circleci/42j8atdDzgh7tmZyp3BEAx/Pshoq7A2DaUQnaF7GuCyVm).

## Directory Structure

- `source/`: Contains the main source code.
  - `main.py`: Entry point of the application.
  - `comments_component/`: Contains the component that handles comments.
    - `comments.py`: Contains the backend functionality for comments (api calls).
  - `tasks_component/`: Contains the component that handles tasks.
    - `tasks.py`: Contains the backend functionality for tasks (api calls).
  - `frontend/`: Contains the React frontend files
    - `frontend/components`: Contains the components used in UI
    - `frontend/GoogleDocsProvider.js`: Context file for React. Backend (Flask) endpoints are called from here.
  - `tests/`: Contains test cases, including a test of component.py.



## Issues

If you encounter any issues or have suggestions, please feel free to [open an issue](https://github.com/agoluoglu/leafeon-google-suite-tasks/issues/new/choose).

## Issue and Pull Request Templates

We have included templates that GitHub automatically uses when opening issues and submitting pull requests. Templates can be edited, added, and deleted by navigating to the GitHub-specific files.
- `.github/`: Contains GitHub-specific files.
  - `ISSUE_TEMPLATE/`: Templates for reporting issues.
  - `PULL_REQUEST_TEMPLATE/`: Template for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
