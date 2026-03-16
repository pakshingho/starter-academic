#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HUGO_BIND_ADDRESS="${HUGO_BIND_ADDRESS:-127.0.0.1}"
HUGO_PORT="${HUGO_PORT:-1315}"

"${SCRIPT_DIR}/scripts/hugo" server \
  --bind "${HUGO_BIND_ADDRESS}" \
  --port "${HUGO_PORT}" \
  --disableFastRender \
  --i18n-warnings \
  "$@"
