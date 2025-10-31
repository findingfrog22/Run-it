import time

if __name__ == '__main__':
    print("Running Docker from Python")

    x = [0 for _ in range(50000)]
    print("Completed allocation task.")
    time.sleep(4)