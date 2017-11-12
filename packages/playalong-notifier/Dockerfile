FROM node
LABEL maintainer="atardadi@gmail.com"

ENV root /playalong-notifier

WORKDIR ${root}

#install node modules
RUN echo 'Starting installs'
RUN npm i -g yarn forever
COPY /package.json ${root}
RUN yarn

#Copy Src files
RUN echo 'Starting copies'
COPY /src ${root}/src
COPY /config ${root}/config

EXPOSE 80:80
EXPOSE 443:443

# Build Playalong Components
RUN yarn build

WORKDIR ${root}/lib

# #This will run on container creation
ENTRYPOINT forever start index.js && bash 
