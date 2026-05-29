#!/bin/sh
set -e

export PORT="${PORT:-80}"
export BACKEND_URL="${BACKEND_URL:-http://backend:8080}"

case "$BACKEND_URL" in
  http://*|https://*) ;;
  *) BACKEND_URL="http://${BACKEND_URL}" ;;
esac

envsubst '${PORT} ${BACKEND_URL}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
