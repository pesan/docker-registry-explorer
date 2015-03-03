# Docker Registry Explorer

Simple Registry Explorer for Docker containers.

![Screenshot](/../meta/main-1.png?raw=true "Screenshot")

Supports:
 * Registries on any host.
 * View image name and its tags.
 * Keyword search on image name.

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
 1. To build, execute `bin/build-registry-explorer-prod.sh <tag>` where `<tag>` is version number, for instance.
 2. To run, execute `docker -it --rm -p 8080:8080 pesan/registry-explorer:<tag>`.
 3. Visit [http://localhost:8080](http://localhost:8080).
