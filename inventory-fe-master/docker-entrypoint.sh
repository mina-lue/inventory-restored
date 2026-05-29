#!/bin/sh
set -e

# Substitute the BACKEND_URL variable into the active Nginx config file directory
echo "Injecting backend target URL: $BACKEND_URL"
envsubst '$BACKEND_URL' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Execute the main container command (nginx -g 'daemon off;')
exec "$@"