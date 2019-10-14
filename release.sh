#!/bin/bash
set -ex

USERNAME=romarius75
IMAGE=rm-ticketing-node-server
DIR=e:/git/rm-ticketing/$IMAGE

# ensure we're up to date
git pull

# bump version
docker run --rm -v $DIR:/app treeder/bump patch
version=`cat VERSION`
echo "version: $version"

# run build
./build.sh

# tag it
git add -A
git commit -m "version $version"
git tag -a "$version" -m "version $version"
git push
git push --tags
docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$version

# push it
docker push $USERNAME/$IMAGE:latest
docker push $USERNAME/$IMAGE:$version

docker image rm --force $USERNAME/$IMAGE:$version
