# Docker Registry Explorer

Simple Registry Explorer for Docker containers.

![Screenshot](/../meta/main-1.png?raw=true "Screenshot")

![Screenshot](/../meta/list-1.png?raw=true "Screenshot")

![Screenshot](/../meta/detail-1.png?raw=true "Screenshot")

## Features
 * Can explore registries on any host.
 * Can keyword search on image name.
 * Can show the pull URL for an image tag.
 * Can display ancestry for an image.

## Building and running

### Run from official Docker image
 1. Execute `docker run -it --rm -p 8080:8080 pesan/registry-explorer:1.0`.
 2. Visit [http://localhost:8080](http://localhost:8080).

### Building and running using Grunt
 1. Execute `bower install`.
 2. Execute `npm install`.
 3. Execute `grunt serve`.
 4. Visit [http://localhost:9000](http://localhost:9000).

### Building development Docker container
 1. To build, execute `bin/build-registry-explorer-dev.sh`.
 2. To run, execute `bin/registry-explorer.sh`.
 3. Visit [http://localhost:9000](http://localhost:9000).

### Building production Docker container
 1. To build, execute `bin/build-registry-explorer-prod.sh <tag>` where `<tag>` is the version number, for instance.
 2. To run, execute `docker -it --rm -p 8080:8080 pesan/registry-explorer:<tag>`.
 3. Visit [http://localhost:8080](http://localhost:8080).
