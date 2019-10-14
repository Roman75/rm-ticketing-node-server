#!/bin/bash

API_URL="https://hub.docker.com/v2"
USERNAME=romarius75
PASSWORD=M2sZS15uD13

echo "GET TOKEN"
TOKEN=$(curl -s -H "Content-Type: application/json" -X POST -d '{"username": "'${USERNAME}'", "password": "'${PASSWORD}'"}' ${API_URL}/users/login/ | sed -e 's/.*"token": "\(.*\)".*/\1/')
echo $TOKEN

curl -s -H "Authorization: JWT ${TOKEN}" --data-urlencode full_description@README.md ${API_URL}/repositories/rm-ticketing-node-server/

#echo "UPDATE DOCKERHUB"
#RESPONSE=$(curl -s --write-out %{response_code} --output /dev/null -H "Authorization: JWT ${TOKEN}" -X PATCH --data-urlencode full_description@README.md ${API_URL}/repositories/rm-ticketing-node-server/)
#echo $RESPONSE

