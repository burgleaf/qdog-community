#!/usr/bin/env bash
set -euo pipefail

RAW_BASE="${AWESOME_CODEX_PET_RAW_BASE:-https://raw.githubusercontent.com/burgleaf/qdog-community/main}"
CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
STATS_API="${AWESOME_CODEX_PET_STATS_API:-https://resource.q.dog}"
NO_STATS="${AWESOME_CODEX_PET_NO_STATS:-0}"

usage() {
  cat <<'EOF'
Usage:
  curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- <pet-slug--author-slug>

Options:
  --codex-home <path>  Install into a custom Codex home directory
  --list               List available pets
  --help               Show this help

Environment:
  CODEX_HOME                   Defaults to ~/.codex when unset
  AWESOME_CODEX_PET_RAW_BASE   Override the GitHub raw base URL
EOF
}

need_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

download() {
  curl -fsSL --retry 2 "$1" -o "$2"
}

new_event_id() {
  if command -v uuidgen >/dev/null 2>&1; then
    uuidgen | tr '[:upper:]' '[:lower:]' | tr -d '-'
    return
  fi
  if command -v openssl >/dev/null 2>&1; then
    openssl rand -hex 16
    return
  fi
  printf '%s.%s.%s' "$(date +%s)" "$$" "${RANDOM:-0}"
}

list_pets() {
  need_command curl
  catalog="$(curl -fsSL --retry 2 "$RAW_BASE/pets.json")"

  if command -v python3 >/dev/null 2>&1; then
    CATALOG="$catalog" python3 - <<'PY'
import json
import os

for pet in json.loads(os.environ["CATALOG"]):
    print(f"{pet['slug']} - {pet.get('name', pet['slug'])} (v{pet.get('spriteVersionNumber', 1)})")
PY
    return
  fi

  printf '%s\n' "$catalog"
}

PET_ID=""

while [ "$#" -gt 0 ]; do
  case "$1" in
    --help|-h)
      usage
      exit 0
      ;;
    --list)
      list_pets
      exit 0
      ;;
    --codex-home)
      if [ "$#" -lt 2 ]; then
        echo "--codex-home requires a path" >&2
        exit 1
      fi
      CODEX_HOME="$2"
      shift 2
      ;;
    --*)
      echo "Unknown option: $1" >&2
      usage
      exit 1
      ;;
    *)
      PET_ID="$1"
      shift
      ;;
  esac
done

if [ -z "$PET_ID" ]; then
  usage
  exit 1
fi

if ! printf '%s' "$PET_ID" | grep -Eq '^[a-z0-9]+(-[a-z0-9]+)*--[a-z0-9]+(-[a-z0-9]+)*$'; then
  echo "Invalid pet id: $PET_ID" >&2
  echo "Expected format: pet-slug--author-slug" >&2
  exit 1
fi

need_command curl
need_command mktemp

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

download "$RAW_BASE/pets/$PET_ID/pet.json" "$TMP_DIR/pet.json"
download "$RAW_BASE/pets/$PET_ID/spritesheet.webp" "$TMP_DIR/spritesheet.webp"

TARGET_DIR="$CODEX_HOME/pets/$PET_ID"
mkdir -p "$TARGET_DIR"
cp "$TMP_DIR/pet.json" "$TARGET_DIR/pet.json"
cp "$TMP_DIR/spritesheet.webp" "$TARGET_DIR/spritesheet.webp"

echo "Installed $PET_ID to $TARGET_DIR"

if [ "$NO_STATS" != "1" ]; then
  EVENT_ID="$(new_event_id)"
  curl -fsS -m 3 -X POST \
    -H "X-Event-ID: $EVENT_ID" \
    "$STATS_API/track/install?slug=$PET_ID" >/dev/null 2>&1 || {
      printf 'Warning: installed successfully, but anonymous install statistics could not be reported.\n' >&2
    }
fi
