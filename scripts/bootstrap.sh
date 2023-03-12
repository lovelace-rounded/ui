#!/bin/sh

set -e

###################################
#### EXECUTION
###################################

echo "============= 📦 Submodules 📦 ============="
rm -R rounded-theme
git submodule update --init --recursive --remote

echo "============= 📦 Python requirements 📦 ============="
pip install -r requirements_dev.txt
pre-commit install --install-hooks --hook-type commit-msg

echo "============= 📦 Pnpm install 📦 ============="
pnpm install