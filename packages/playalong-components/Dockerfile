FROM node

ENV root /playalong-components

WORKDIR ${root}


#install node modules
RUN echo 'Starting installs'
COPY /package.json ${root}
RUN npm install

#Copy Src files
RUN echo 'Starting copies'
COPY /scripts ${root}/scripts
COPY /public ${root}/public
COPY /config ${root}/config
COPY /src ${root}/src


# Build Playalong Components
RUN npm run build:docs
