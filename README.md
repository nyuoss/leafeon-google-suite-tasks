# Python Project Template
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)  [![CircleCI](https://dl.circleci.com/status-badge/img/circleci/42j8atdDzgh7tmZyp3BEAx/NKkbAnw1PXUdhc74vJtLL7/tree/main.svg?style=shield&circle-token=314b77a67a9ca6178d4e8330c76aa0736e30c210)](https://dl.circleci.com/status-badge/redirect/circleci/42j8atdDzgh7tmZyp3BEAx/NKkbAnw1PXUdhc74vJtLL7/tree/main)

This is a template repository for Python projects. It includes a basic setup for managing dependencies, continuous integration, and directory structure commonly used in Python projects.  

## PDM
This repository uses [PDM](https://pdm-project.org/latest/) to manage Python packages and dependencies.  
The configuration can be found in the `pyproject.toml` file. To add or remove dependencies, check the PDM documentation for [managing dependencies](https://pdm-project.org/latest/usage/dependency/).

## Flake8 & Black
This repository uses [Flake8](https://flake8.pycqa.org/en/latest/) linting as its static analysis tool to check the code against various style rules and detect potential issues, such as syntax errors, unused variables, or overly complex code.  
[Black](https://black.readthedocs.io/en/stable/) is then used for code formatting.  
To modify rules for tools like flake8 and black, check the configurations under `[tool.flake8]` and `[tool.black]` in the `pyproject.toml` file.

## Pytest
This repository uses [Pytest](https://docs.pytest.org/en/8.0.x/) for code testing.  
Pytest is set to run on the `source/tests` directory in the "Run tests" run step of the `.circleci/config.yml` file.

## CircleCI
This repository uses [CircleCI](https://circleci.com/) for continuous integration.  
CircleCI will automatically set up python with PDM, install default and development dependencies, run tests with pytest, perform static analysis with flake8, and apply black formatting. To modify these build steps, check the configuration in the `.circleci/config.yml` file.  

## Directory Structure

- `source/`: Contains the main source code.
  - `main.py`: Entry point of the application.
  - `component/`: Contains an example component.
    - `component.py`: Contains an example function `add`.
  - `tests/`: Contains test cases, including a test of component.py.

## Usage
If you would like to use this template, click the "Use this Template" button in the top right corner.
<img width="1314" alt="Screenshot 2024-02-10 at 5 33 41 PM" src="https://github.com/zhangdzh/py-template/assets/119933910/242837ec-7155-443f-b3a3-f510ffccd158">

## Contributing
If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Clone the repository to your local machine.
3. Install PDM: `pip install pdm`.
4. Install dependencies: `pdm install`.
5. Create a new branch for your feature/fix: `git checkout -b feature-name`.
6. Make your changes and ensure they pass all tests and checks
   - run `pdm run pytest source/tests` for testing
   - run `pdm run flake8 source` for linting
   - run `pdm run black .` for code formatting
7. Commit your changes: `git commit -m 'Add new feature'`.
8. Push to the branch: `git push origin feature-name`.
9. Submit a pull request.

Please make sure to update tests as appropriate.

## Issues

If you encounter any issues or have suggestions, please feel free to [open an issue](https://github.com/your_username/your_repository/issues/new).

## Issue and Pull Request Templates

We have included templates that GitHub automatically uses when opening issues and submitting pull requests. Templates can be edited, added, and deleted by navigating to the GitHub-specific files.
- `.github/`: Contains GitHub-specific files.
  - `ISSUE_TEMPLATE/`: Templates for reporting issues.
  - `PULL_REQUEST_TEMPLATE/`: Template for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
