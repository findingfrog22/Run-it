FROM python:3.9
# WORKDIR /usr/app/src
ADD main.py .

RUN pip install tqdm psutil

CMD ["python", "./main.py"]