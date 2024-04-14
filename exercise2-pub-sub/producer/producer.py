import pika, os, time

print("Producer Delaying for RabbitMQ to Initialize")
time.sleep(20)  # Delay for RabbitMQ container to initialize
print("Producer starting")

connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq'))
channel = connection.channel()

channel.queue_declare(queue='hello')

while True:
    time.sleep(5)
    channel.basic_publish(exchange='',
                          routing_key='hello',
                          body='Hello World!')
    print(" [x] Sent 'Hello World!'")
   