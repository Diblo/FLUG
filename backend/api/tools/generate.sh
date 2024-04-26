#!/bin/bash

projectDir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

docker run --rm -v "$projectDir":/local openapitools/openapi-generator-cli generate -i /local/OpenAPI.yml -g php-slim4 -o /local/src
