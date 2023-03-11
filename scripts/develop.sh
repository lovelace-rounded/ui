#!/bin/sh

set -e

###################################
#### EXECUTION
###################################

echo "============= 🧹 Clean 🧹 ============="
rm -rf ./dist/

echo "============= 📦 Pnpm install 📦 ============="
cd "homeassistant-frontend/" && pnpm install
cd ../ && pnpm install

echo "============= ⚒️ Build ⚒️ ============="
pnpm run dev
