FROM golang:1.9.0

ENV GOPATH $GOPATH:/go/src

RUN apt-get update && \
    apt-get upgrade -y

# install revel and revel-cli
RUN go get github.com/revel/revel && \
    go get github.com/revel/cmd/revel

# Add our code
ADD . /go/src/near_me_server
WORKDIR /go/src/near_me_server

# EXPOSE 9000

CMD revel run near_me_server prod $PORT
