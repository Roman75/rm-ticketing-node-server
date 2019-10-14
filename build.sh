#!/bin/bash
set -ex

USERNAME=romarius75
IMAGE=rm-ticketing-node-server

docker build -t $USERNAME/$IMAGE:latest .

