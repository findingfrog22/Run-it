import docker
import time
import psutil
from multiprocessing import Process
import tqdm

## This script will allow us to run a specific docker container with specific cpu and memory limits
## for a specific type of code.

## Need to figure out file uploads, etc.

client = docker.from_env()


def f(container_id):
    with tqdm.tqdm(total=100, desc='CPU %', position=0) as cpubar, tqdm.tqdm(total=100, desc='RAM %', position=1) as rambar:

        container = client.containers.get(container_id=container_id)
        while True:
            stats = container.stats(stream = False)
            
            cpu_delta = stats["cpu_stats"]["cpu_usage"]["total_usage"] - stats["precpu_stats"]["cpu_usage"]["total_usage"]
            system_delta = stats["cpu_stats"]["system_cpu_usage"] - stats["precpu_stats"]["system_cpu_usage"]
            num_cpus = stats["cpu_stats"]["online_cpus"]

            cpu_percent = (cpu_delta / system_delta) * num_cpus * 100.0 if system_delta > 0 else 0.0

            # Memory usage
            mem_usage = stats["memory_stats"]["usage"]
            mem_limit = stats["memory_stats"]["limit"]
            mem_percent = (mem_usage / mem_limit) * 100.0

            rambar.n=mem_percent
            cpubar.n=cpu_percent

            rambar.refresh()
            cpubar.refresh()
            time.sleep(0.5)

if __name__ == '__main__':
    try:
        container = client.containers.run(
            image="chenjohnnycs/python-script-runner",
            cpu_count=2,
            mem_limit="12mb", # Memory Limit is 6 megabytes
            detach=True
        )

        print("Container {} started.".format(container.short_id))

        ## Start Live Ram / CPU bars
        # p = Process(target=f, args=(container.id,))
        # p.start()

        stats = container.stats(stream = False)
            
        cpu_delta = stats["cpu_stats"]["cpu_usage"]["total_usage"] - stats["precpu_stats"]["cpu_usage"]["total_usage"]
        system_delta = stats["cpu_stats"]["system_cpu_usage"] - stats["precpu_stats"]["system_cpu_usage"]
        num_cpus = stats["cpu_stats"]["online_cpus"]

        cpu_percent = (cpu_delta / system_delta) * num_cpus * 100.0 if system_delta > 0 else 0.0

        # Memory usage
        mem_usage = stats["memory_stats"]["usage"]
        mem_limit = stats["memory_stats"]["limit"]
        mem_percent = (mem_usage / mem_limit) * 100.0

        print("CPU Percentage:",cpu_percent)
        print("RAM Percentage:",mem_percent)

        # ## Running specific test file
        print("Running test file main.py:")
        container.exec_run("python -u test_files/main.py")

    except docker.errors.ContainerError as E:
        print("Error running Docker Container", E)
    except docker.errors.ImageNotFound as E:
        print("Image not found", E)