FROM python:3.7-slim
WORKDIR /app
COPY ./requirments.txt ./requirments.txt
RUN pip install -r requirments.txt
COPY . .
CMD ["python", "consumer.py"]