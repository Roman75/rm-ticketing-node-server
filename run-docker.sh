#!/bin/bash
docker run --name rm_ticketing_node_server -p 8080:8080 -v %cd%/.config-docker.yaml:/node/.config.yaml romarius75/rm-ticketing-node-server
