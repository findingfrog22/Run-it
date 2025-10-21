FROM python:3.9-slim-buster

WORKDIR /src

COPY . /src

CMD ["python", "main.py"]