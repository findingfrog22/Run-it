FROM python:3.9-slim-buster
WORKDIR /usr/app/src
COPY . .
CMD ["python", "main.py"]
