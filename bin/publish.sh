#!/bin/bash
npm run build
cp ./README.md ./packages/bonaparte/
cp -R ./dist ./packages/bonaparte/dist
FORCE_VERSION=bonaparte ./node_modules/.bin/lerna publish
rm ./packages/bonaparte/README.md
rm -R ./packages/bonaparte/dist
