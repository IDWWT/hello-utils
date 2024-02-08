# build stage
FROM python:3.9-slim as builder

WORKDIR /app
RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    python -m pip install -r requirements.txt
COPY . .

# develop stage
FROM python:3.9-slim as development

ENV FLASK_ENV=development
ENV FLASK_DEBUG=1

WORKDIR /app
COPY --from=builder /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
COPY --from=builder /app /app

EXPOSE 8000
# CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
CMD ["python", "app.py"]

# production stage
FROM python:3.9-slim as production

ENV FLASK_ENV=production
ENV FLASK_DEBUG=0

WORKDIR /app
COPY --from=builder /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
COPY --from=builder /app /app

EXPOSE 8000
# CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
CMD ["python", "app.py"]