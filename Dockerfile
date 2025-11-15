FROM python:3.9
WORKDIR /usr/app/src
ADD . .
RUN pip install -r scripts/requirements.txt
# EXPOSE 5000
ENTRYPOINT ["tail", "-f", "/dev/null"]