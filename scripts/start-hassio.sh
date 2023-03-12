#!/bin/sh

set -e

###################################
#### EXECUTION
###################################

echo "============= 📦 Python requirements 📦 ============="
pip install -r requirements_dev.txt

echo "============= 🚀 Hassio 🚀 ============="
mkdir -p .hass_dev/themes/
cp rounded-theme/themes/* .hass_dev/themes/
hass -c .hass_dev/ --debug