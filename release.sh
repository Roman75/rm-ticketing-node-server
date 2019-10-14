#!/bin/bash
#set -ex

$version=0.0.7

#USERNAME=romarius75
#PASSWORD=M2sZS15uD13
#IMAGE=rm-ticketing-node-server
#DIR=e:/git/rm-ticketing/$IMAGE

# ensure we're up to date
#git pull

# bump version
#docker run --rm -v $DIR:/app treeder/bump patch
#version=`cat VERSION`
#echo "version: $version"

# run build
#./build.sh

# tag it
git add -A
git commit -m "version $version"
git tag -a "$version" -m "version $version"
git push
git push --tags
#docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$version

# push it
#docker push $USERNAME/$IMAGE:latest
#docker push $USERNAME/$IMAGE:$version

#docker image rm --force $USERNAME/$IMAGE:latest
#docker image rm --force $USERNAME/$IMAGE:$version

#echo "GET TOKEN"
#TOKEN=$(curl -s -H "Content-Type: application/json" -X POST -d '{"username": "'${USERNAME}'", "password": "'${PASSWORD}'"}' ${API_URL}/users/login/ | sed -e 's/.*"token": "\(.*\)".*/\1/')
#echo $TOKEN

#echo "UPDATE DOCKERHUB"
#RESPONSE=$(curl -s --write-out %{response_code} --output /dev/null -H "Authorization: JWT ${TOKEN}" -X PATCH --data-urlencode full_description@${README} ${API_URL}/repositories/${REPO}/)
