@set "projectDir=%~dp0.."

CALL docker run --rm -v %projectDir%:/local openapitools/openapi-generator-cli generate -i /local/OpenAPI.yml -g php-slim4 -o /local/src
rem CALL docker run --rm -v %projectDir%:/local openapitools/openapi-generator-cli generate -i /local/OpenAPI.yml -g mysql-schema -o /local/sql
