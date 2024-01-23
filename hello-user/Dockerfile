ARG PYTHON_VERSION=3.9.6
FROM python:${PYTHON_VERSION}-slim as base

WORKDIR /app

RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    python -m pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD python3 -m flask run --host=0.0.0.0