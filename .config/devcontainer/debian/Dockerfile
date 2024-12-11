FROM debian:12

# Configure variables
ARG HTTP_PROXY
ARG HTTPS_PROXY
ARG FTP_PROXY
ARG NO_PROXY
ARG USER=developer
ARG TEMP_DIR=/tmp/project

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Copy project files to the workspace directory
COPY . /tmp/project

# Create env_vars file
RUN echo "export HTTP_PROXY=\"$HTTP_PROXY\"" > $TEMP_DIR/env_vars && \
  echo "export HTTPS_PROXY=\"$HTTPS_PROXY\"" >> $TEMP_DIR/env_vars && \
  echo "export FTP_PROXY=\"$FTP_PROXY\"" >> $TEMP_DIR/env_vars && \
  echo "export NO_PROXY=\"$NO_PROXY\"" >> $TEMP_DIR/env_vars && \
  echo "export USER=\"$USER\"" >> $TEMP_DIR/env_vars && \
  echo "export TEMP_DIR=\"$TEMP_DIR\"" >> $TEMP_DIR/env_vars

# Run main setup script
# Set Git safe directory
# Change ownership of the project directory
WORKDIR $TEMP_DIR

RUN ./.config/devcontainer/debian/scripts/init.sh && \
  git config --system --add safe.directory $TEMP_DIR && \
  chown -R $USER:$USER $TEMP_DIR

# Switch to non-root user
USER $USER

# Set the default shell to bash
ENV SHELL=/bin/bash
ENV USER=$USER

# Add local bin to PATH
ENV PATH="/home/${USER}/.local/bin:${PATH}"

# Run setup task
RUN task dev:setup-environment

# Run final scripts
RUN ./.config/devcontainer/debian/scripts/setup-docker.sh "$USER" \
  && ./.config/devcontainer/debian/scripts/cleanup.sh

# Create the workspace directory
WORKDIR /home/$USER/workspace/project

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD task --version || exit 1
