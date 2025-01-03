FROM gcr.io/kaniko-project/executor:latest

WORKDIR /workspace

COPY . .

# Copy authentication file to the correct location
COPY .config/kaniko/secret.json /kaniko/.docker/config.json
