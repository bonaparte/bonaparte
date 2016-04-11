#!/bin/bash
rsync -r --exclude '.git/' --exclude 'node_modules' ./ ./packages/bonaparte
FORCE_VERSION=bonaparte ./node_modules/.bin/lerna publish
mv ./packages/bonaparte/package.json ./package.json
rm -r ./packages/bonaparte
