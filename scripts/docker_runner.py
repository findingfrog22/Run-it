import docker

## This script will allow us to run a specific docker container with specific cpu and memory limits
## for a specific type of code.

## Need to figure out file uploads, etc.

client = docker.from_env()

try:
    container = client.containers.run(
        image="chenjohnnycs/python-script-runner",
        cpu_count=2,
        mem_limit="6mb" # Memory Limit is 6 megabytes
    )
    print("Docker Container Output:", container.decode('utf-8'))
except docker.errors.ContainerError as E:
    print("Error running Docker Container", E)
except docker.errors.ImageNotFound as E:
    print("Image not found", E)