#!/bin/bash

projectDir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

php -S localhost:8888 -t "$projectDir/src/public"
