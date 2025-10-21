# import psutil
# import os
# import time

# def get_process_info():
#     process = psutil.Process(os.getpid())
#     cpu_percent = process.cpu_percent(interval=None)
#     memory_info = process.memory_info()
#     return cpu_percent, memory_info.rss / (1024 * 1024)

# get_process_info()
# time.sleep(1)
# cpu, mem = get_process_info()
# print(psutil.Process(os.getpid()).cpu_times())
# print(f"CPU usage: {cpu}%")
# print(f"Memory usage: {mem:.2f} MB")

from tqdm import tqdm
from time import sleep
from multiprocessing import Pool
from multiprocessing import Process

import psutil
import os

def f():
    with tqdm(total=100, desc='cpu%', position=1) as cpubar, tqdm(total=100, desc='ram%', position=0) as rambar:
        while True:
            rambar.n=psutil.virtual_memory().percent
            cpubar.n=psutil.cpu_percent()

            rambar.refresh()
            cpubar.refresh()
            sleep(0.5)

if __name__ == '__main__':
    p = Process(target=f)
    p.start()

    # g = 1
    # for i in range(100_000_000):
    #     g = g * 2 % 1023874
    print("\nRunning memory-intensive task...")
    big_list = [i for i in range(500_000_000)]

    print("\n G Completed \n")