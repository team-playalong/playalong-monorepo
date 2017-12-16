FROM node
LABEL maintainer="atardadi@gmail.com"

ENV ROOT /playalong-notifier

WORKDIR ${ROOT}

#install node modules
RUN echo 'Starting installs'
RUN npm i -g yarn forever
COPY . ${ROOT}
RUN yarn

EXPOSE 80:80
EXPOSE 443:443

# Build Playalong Components
RUN yarn build

WORKDIR ${ROOT}/lib

# #This will run on container creation
ENTRYPOINT forever start index.js && bash
