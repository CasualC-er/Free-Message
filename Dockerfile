FROM node:18-bookworm
SHELL ["/bin/bash", "--login", "-c"]

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
RUN nvm install 19.0.0


# create destination directory
RUN mkdir -p /usr/src/FreeMessage-client
WORKDIR /usr/src/FreeMessage-client

# update and install dependency
RUN apt update && apt upgrade
RUN apt install git
RUN nvm use 19.0.0

# copy the app, note .dockerignore
COPY . /usr/src/FreeMessage-client/
RUN npm install
RUN npm run build

EXPOSE 5000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "start" ]
