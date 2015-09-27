#!/bin/bash

# If you have this error:

# Error: The libsass binding was not found in ../node_modules/node-sass/vendor/linux-x64-11/binding.node
# (STDERR) This usually happens because your node version has changed.
# (STDERR) Run npm rebuild node-sass to build the binding for your current node version.
# (STDERR) at Object.sass.getBinaryPath (../node_modules/node-sass/lib/extensions.js:150:11)

# It is because Meteor is running on a different Node.js version than your local version. You can fix it easily:

# 1. Open this script with your favorite editor
# 2. Set the correct SASS_BINARY_NAME value based on the directory between vendor and binding.node in the error message: .../vendor/linux-x64-11/binding.node
# 3. Run the script and the error should disappear

SASS_BINARY_NAME=linux-x64-11
NODE_VERSION=v0.10.40

ROOT_FOLDER=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/..
cd $ROOT_FOLDER/node_modules/node-sass
node $ROOT_FOLDER/node_modules/node-sass/scripts/build.js --arch=$SASS_BINARY_NAME --target=$NODE_VERSION --force
