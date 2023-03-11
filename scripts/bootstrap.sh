#!/bin/sh

set -e

###################################
#### EXECUTION
###################################

echo "============= 📦 Submodules 📦 ============="
rm -R homeassistant-frontend
rm -R rounded-theme
git submodule update --init --recursive --remote

echo "============= 📦 Python requirements 📦 ============="
pip install -r requirements_dev.txt
pre-commit install --install-hooks

echo "============= 📦 Pnpm install 📦 ============="
cd "homeassistant-frontend/" && pnpm install
cd ../ && pnpm install