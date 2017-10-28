FROM node
LABEL maintainer="atardadi@gmail.com"

ENV root /playalong-components

WORKDIR ${root}

#install node modules
RUN echo 'Starting installs'
RUN npm i -g http-server yarn
COPY /package.json ${root}
RUN yarn

#Copy Src files
RUN echo 'Starting copies'
COPY /scripts ${root}/scripts
COPY /public ${root}/public
COPY /config ${root}/config
COPY /src ${root}/src

EXPOSE 8080

# Build Playalong Components
RUN npm run build:docs
