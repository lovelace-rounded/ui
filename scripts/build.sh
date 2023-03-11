#!/bin/sh

set -e

###################################
#### EXECUTION
###################################

echo "============= 🧹 Clean 🧹 ============="
rm -rf ./dist/

echo "============= 📦 Pnpm install 📦 ============="
pnpm install

echo "============= ⚒️ Build ⚒️ ============="
pnpm run build
