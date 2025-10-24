FROM python:3.9
WORKDIR /usr/app/src
ADD . .

RUN pip install tqdm psutil

ENTRYPOINT ["tail", "-f", "/dev/null"]