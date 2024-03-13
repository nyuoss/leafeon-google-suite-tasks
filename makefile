LINTER = flake8
API_DIR = source
REQ_DIR = .
PYTESTFLAGS = -vv --verbose --tb=short

FORCE:

prod: tests github

github: FORCE
	- git commit -a
	git push origin master

tests: lint unit

unit: FORCE
	python3 -m pytest $(PYTESTFLAGS)

lint: FORCE
	$(LINTER) $(API_DIR)/*.py

dev_env: FORCE
	pip install -r $(REQ_DIR)/requirements.txt