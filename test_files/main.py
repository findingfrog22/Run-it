from tqdm import tqdm
from time import sleep
from multiprocessing import Pool
from multiprocessing import Process

import psutil
import os

# def f():
#     with tqdm(total=100, desc='cpu%', position=1) as cpubar, tqdm(total=100, desc='ram%', position=0) as rambar:
#         while True:
#             rambar.n=psutil.virtual_memory().percent
#             cpubar.n=psutil.cpu_percent()

#             rambar.refresh()
#             cpubar.refresh()
#             sleep(0.5)

if __name__ == '__main__':
    # p = Process(target=f)
    # p.start()

    print("Running Docker from Python")