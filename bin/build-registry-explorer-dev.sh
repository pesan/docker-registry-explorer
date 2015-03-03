#!/bin/sh
PROJECT_ROOT=$(readlink -f "$(dirname "$0")/../")
docker --dns=8.8.8.8 build -t pesan/registry-explorer:dev "$PROJECT_ROOT"
