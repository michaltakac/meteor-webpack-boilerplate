#!/bin/bash

ROOT_FOLDER=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/..
cd $ROOT_FOLDER
npm install
rm -rf meteor/react-build-generated

cd meteor
export WEBPACK_CONFIG=$ROOT_FOLDER/webpack/development.config.js
meteor --settings $ROOT_FOLDER/settings/development.json
