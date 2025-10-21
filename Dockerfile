FROM python:3.9-slim-buster

WORKDIR /app/src

COPY . /app/src

CMD ["python", "main.py"]