#!/bin/bash
set -euo pipefail

HOST="${1:-187.127.153.232}"
RELEASE="20261106-113500"
ARCHIVE="/Users/berymo/Desktop/accruetechnologies-website/dist-release/website-release-20261106.tar.gz"

echo "=== Deploying Accrue Technologies Website to $HOST ==="

# 1. Upload release archive to server
echo "Uploading website release bundle..."
scp "$ARCHIVE" "root@$HOST:/tmp/website-release-$RELEASE.tar.gz"

# 2. Extract and build on server
echo "Unpacking and rebuilding website on server..."
ssh "root@$HOST" bash -s <<EOF
set -euo pipefail

TARGET_DIR="/opt/accrue-technologies/releases/$RELEASE"
mkdir -p "\$TARGET_DIR"

echo "Extracting website release..."
tar -xzf "/tmp/website-release-$RELEASE.tar.gz" -C "\$TARGET_DIR"
rm -f "/tmp/website-release-$RELEASE.tar.gz"

# Link or copy server private .env
if [ -f "/opt/accrue-technologies/.env" ]; then
  cp "/opt/accrue-technologies/.env" "\$TARGET_DIR/.env"
elif [ -f "/opt/accrue-technologies/current/.env" ]; then
  cp "/opt/accrue-technologies/current/.env" "\$TARGET_DIR/.env"
fi

cd "\$TARGET_DIR"

echo "Building and restarting website containers..."
docker compose -p accrue-technologies up -d --build

echo "Updating current release symlink..."
ln -sfn "\$TARGET_DIR" /opt/accrue-technologies/current 2>/dev/null || true

echo "Checking website status..."
curl -fsS -o /dev/null http://127.0.0.1:4183/ && echo "Website healthy on 127.0.0.1:4183!"

echo "Deployment of website release $RELEASE completed successfully!"
EOF
