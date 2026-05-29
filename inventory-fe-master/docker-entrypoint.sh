#!/bin/sh
set -e

# 1. Manually substitute $BACKEND_URL from Render into the final Nginx config
echo "Substituting environment variables..."
envsubst '$BACKEND_URL' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# 2. Execute the CMD (which runs Nginx)
exec "$@"