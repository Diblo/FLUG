#!/bin/bash

projectDir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$projectDir/src"
composer install
