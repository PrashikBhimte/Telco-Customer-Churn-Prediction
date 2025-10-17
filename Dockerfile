FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY ./backend /app/backend
COPY ./model_training /app/model_training

EXPOSE 8000

CMD uvicorn backend.main:app --host 0.0.0.0 --port $PORT