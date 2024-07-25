import socket
import time
import threading

stop_event = threading.Event()

secFlag = False
def timer():
    print("!")
    i = 0
    while not stop_event.is_set():
        print(i)
        if(i>50):
            secFlag = True
            print("!!!!!!")
            print("Client disconnected.")
            print(i)
            client.close()
            break
        time.sleep(1)
        i+=1
        


# Server settings
host = '192.168.212.94'  # Your PC's IP address
port = 12345           # Choose a port number

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((host, port))
server.listen(1)

print(f"Listening for connections on {host}:{port}...")

while True:
    client, address = server.accept()
    print(f"Connection from {address}")

    while True:
        thread = threading.Thread(target=timer)
        thread.start()
        
        data = client.recv(1024).decode()
        
        stop_event.set()
        time.sleep(1)
        stop_event.clear()
        if not data:
            break  # No more data from client, close the connection

        print(f"Received data from ESP8266: {data}")
        # Process the received data as needed
        if secFlag == True:
            break
    if secFlag == True:
            break

        

    print("Client disconnected.")
    client.close()