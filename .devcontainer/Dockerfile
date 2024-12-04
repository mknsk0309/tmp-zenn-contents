FROM node:alpine

ARG ENV_USERNAME
ARG ENV_WORKDIR

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

RUN apk update && apk add --no-cache git bash tzdata

RUN adduser -D ${ENV_USERNAME} \
  && mkdir -p ${ENV_WORKDIR}/node_modules \
  && chown -R ${ENV_USERNAME}:${ENV_USERNAME} ${ENV_WORKDIR}/node_modules

WORKDIR ${ENV_WORKDIR}
USER ${ENV_USERNAME}

COPY package.json yarn.lock ${ENV_WORKDIR}/
RUN yarn install
