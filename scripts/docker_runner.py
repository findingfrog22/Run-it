import docker
import time
import psutil
from multiprocessing import Process, Manager
import tqdm

## This script will allow us to run a specific docker container with specific cpu and memory limits
## for a specific type of code.

## Need to figure out file uploads, etc.
client = docker.from_env()

def f(container_id, res_dict):
    container = client.containers.get(container_id=container_id)

    cpu_readings = []
    mem_readings = []

    while res_dict["running"]:
        stats = container.stats(stream = False)
            
        cpu_delta = stats["cpu_stats"]["cpu_usage"]["total_usage"] - stats["precpu_stats"]["cpu_usage"]["total_usage"]
        system_delta = stats["cpu_stats"]["system_cpu_usage"] - stats["precpu_stats"]["system_cpu_usage"]
        num_cpus = stats["cpu_stats"]["online_cpus"]

        cpu_percent = (cpu_delta / system_delta) * num_cpus * 100.0 if system_delta > 0 else 0.0

        # Memory usage
        mem_usage = stats["memory_stats"]["usage"]

        cpu_readings.append(cpu_percent)
        mem_readings.append(mem_usage)

        time.sleep(0.25)

    res_dict["avg_cpu"] = sum(cpu_readings) / len(cpu_readings) if cpu_readings else 0
    res_dict["avg_mem"] = (sum(mem_readings) / len(mem_readings)) if mem_readings else 0

if __name__ == '__main__':
    factor = 1000000
    try:
        file = input("Enter the file name you want to run: ").strip()
        user_mem_limit = input("Enter the memeory limit in MB: ").strip()

        container = client.containers.run(
            image="chenjohnnycs/python-script-runner",
            cpu_count=2,
            mem_limit="{}mb".format(user_mem_limit), # Memory Lower Limit is 6 megabytes
            detach=True,
        )
        print("Container {} started.".format(container.short_id))

        stats = container.stats(stream = False)
        mem_limit = (stats["memory_stats"]["limit"])

        with Manager() as manager:
            res_dict = manager.dict()
            res_dict["running"] = True

            p = Process(target=f, args=(container.id, res_dict))
            p.start()

            ## Running specific test file
            print("Running test file {}:".format(file))

            print("==== Program Output ====")
            for chunk in container.exec_run("python -u test_files/{}".format(file), stream=True).output:
                print(chunk.decode())
            print("==== Program End ====")
            
            res_dict["running"] = False
            p.join()

            print("==== Average Running Stats ====")
            print("Average CPU stats --> {:.3f}%".format(res_dict["avg_cpu"]))
            print("Average MEM stats --> {:.3f} MB / {:.3f} MB ({:.3f}%)".format(res_dict["avg_mem"]/factor, mem_limit/factor, (res_dict["avg_mem"]/mem_limit)*100))

        container.stop()
        container.remove()

    except docker.errors.ContainerError as E:
        print("Error running Docker Container", E)
    except docker.errors.ImageNotFound as E:
        print("Image not found", E)