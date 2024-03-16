#!/bin/bash

# Read the value of NODE_ENV from the .env file
NODE_ENV=$(grep NODE_ENV .env | cut -d '=' -f2)

# Check the value of NODE_ENV
if [ "$NODE_ENV" = "prod" ]; then
    # Execute commands for production environment
    ./mvnw clean package
    docker build -t server-dietideals24-render .
    docker tag server-dietideals24-render graffioh/server-dietideals24-render
    docker push graffioh/server-dietideals24-render:latest
else
    # Execute commands for non-production environment
    ./mvnw clean package
    docker build -t server-dietideals24-render-dev .
    docker tag server-dietideals24-render-dev graffioh/server-dietideals24-render-dev
    docker push graffioh/server-dietideals24-render-dev:latest
fi