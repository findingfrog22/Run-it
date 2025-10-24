FROM python:3.9
WORKDIR /usr/app/src
ADD . ./usr/app/src

RUN pip install tqdm psutil

CMD ["python", "-u", "./usr/app/src/test_files/main.py"]