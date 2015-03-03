#!/bin/sh
if [ "$#" != 1 ] ; then
	echo "Usage:"
	echo " $0 <tag>"
	exit 1
fi

TAG="$1"
PROJECT_ROOT=$(readlink -f "$(dirname "$0")/../")
cd "$PROJECT_ROOT" && \
bower install && \
npm install && \
grunt clean && grunt && \
docker --dns=8.8.8.8 build -t pesan/registry-explorer:${TAG} "$PROJECT_ROOT/dist"
