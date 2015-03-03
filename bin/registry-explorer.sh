#!/bin/sh
PROJECT_ROOT=$(readlink -f "$(dirname "$0")/../")
docker run -it --rm \
	-v "${PROJECT_ROOT}/server:/app/server:ro" \
	-v "${PROJECT_ROOT}/client/app:/app/client/app:ro" \
	-v "${PROJECT_ROOT}/client/assets:/app/client/assets:ro" \
	-v "${PROJECT_ROOT}/client/components:/app/client/components:ro" \
	-v "${PROJECT_ROOT}/e2e:/app/e2e:ro" \
	-p 5858:5858 \
	-p 9000:9000 \
	-p 35729:35729 \
	pesan/registry-explorer:dev "$@"
