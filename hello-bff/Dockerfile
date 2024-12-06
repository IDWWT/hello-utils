# base stage
FROM python:3.9-slim as base
EXPOSE 13031
WORKDIR /app
RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    python -m pip install -r requirements.txt
COPY . .

# develop stage
FROM base as development
ENV FLASK_ENV=development
ENV FLASK_DEBUG=1
# CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
CMD ["python", "app.py"]

# production stage
FROM base as production
ENV FLASK_ENV=production
ENV FLASK_DEBUG=0
# Install Doppler CLI
RUN apt-get update && apt-get install -y apt-transport-https ca-certificates curl gnupg && \
    curl -sLf --retry 3 --tlsv1.2 --proto "=https" 'https://packages.doppler.com/public/cli/gpg.DE2A7741A397C129.key' | gpg --dearmor -o /usr/share/keyrings/doppler-archive-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/doppler-archive-keyring.gpg] https://packages.doppler.com/public/cli/deb/debian any-version main" | tee /etc/apt/sources.list.d/doppler-cli.list && \
    apt-get update && \
    apt-get -y install doppler
ENTRYPOINT ["doppler", "run", "--"]
# CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
CMD ["python", "app.py"]
