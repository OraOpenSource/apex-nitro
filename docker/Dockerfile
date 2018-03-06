# Original source from https://hub.docker.com/_/node/
FROM node:9.7.1-alpine
MAINTAINER Martin DSouza <martin@talkapex.com>

# NPM_CONFIG_PREFIX: See below
# PATH: Required for ask cli location
ENV TZ="GMT" \
  NPM_CONFIG_PREFIX=/home/node/.npm-global \
  PATH="${PATH}:/home/node/.npm-global/bin/" 

# Dont need bash but in case want to debug
# RUN apk add --update \
#   bash

USER node
RUN npm install -g apex-nitro && \
  mkdir ~/www

VOLUME ["/home/node/.apex-nitro", "/home/node/www"]

# 3000: nitro config
# 4000: nitro
EXPOSE 3000 4000