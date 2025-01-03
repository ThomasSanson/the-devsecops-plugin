# hadolint global ignore=DL3007,DL3002,DL3059
# kics-scan ignore
# Rationale: We deliberately use 'latest' as this is a development container
# and we require the most recent Kaniko features for optimal functionality.
# Rationale: Running as root is required for Kaniko to function properly
# as it needs elevated privileges for container operations.
# Rationale: HEALTHCHECK is not applicable for this image as it serves
# as a build-only container that does not run as a long-lived service.
FROM gcr.io/kaniko-project/executor:latest

WORKDIR /workspace

COPY . .

# Copy authentication file to the correct location
COPY .config/kaniko/secret.json /kaniko/.docker/config.json
