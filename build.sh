#!/usr/bin/env bash

COMPOSE_FILE="docker-compose.yml"
PROJECT_NAME="ndblegacy"

if [ "$#" -gt 0 ]; then
  echo "Building test environment"
  COMPOSE_FILE="docker-compose-test.yml"
  PROJECT_NAME="testndblegacy"
else
    echo "Building production environment"
fi

docker-compose -f ${COMPOSE_FILE} -p ${PROJECT_NAME} build
