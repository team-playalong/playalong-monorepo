FROM node

WORKDIR /

COPY ./build /build
COPY ./package.json /

RUN cd / && \
    npm install && \
    npm run build:docs
