FROM golang:1.9.0

ENV GOPATH $GOPATH:/go/src

RUN apt-get update && \
    apt-get upgrade -y

# install revel and revel-cli
RUN go get github.com/revel/revel && \
    go get github.com/revel/cmd/revel

# change current dir
RUN mkdir /go/src/near_me_server

EXPOSE 9000
