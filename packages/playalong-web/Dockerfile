FROM smebberson/alpine-nginx-nodejs:latest
LABEL maintainer="atardadi@gmail.com"

ENV root /playalong-web
ENV NGINX_ROOT /usr/html

WORKDIR ${root}

#install node modules
RUN echo 'Starting installs'
RUN npm i -g yarn
COPY /package.json ${root}
RUN yarn

#Copy Src files
RUN echo 'Starting copies'
COPY /scripts ${root}/scripts
COPY /public ${root}/public
COPY /config ${root}/config
COPY /src ${root}/src

# Build Playalong Components
RUN yarn build

#Copy build files into nginx root folder
RUN cd build && cp -Rf . ${NGINX_ROOT}

WORKDIR ${NGINX_ROOT}

EXPOSE 80
EXPOSE 443

# #This will run on container creation
ENTRYPOINT nginx
