#!/bin/sh

echo "Waiting for database connection on db:3306..."
# Simple bash/sh check to wait for port 3306 to open on db host
until nc -z -v -w30 db 3306
do
  echo "Database is not ready yet. Retrying in 2 seconds..."
  sleep 2
done

echo "Database is ready! Running database migrations..."
npm run migrate

if [ "$AUTO_SEED" = "true" ]; then
  echo "AUTO_SEED is active. Seeding baseline data..."
  node scripts/seed.js
  echo "Seeding Urdu/Arabic demo datasets..."
  node scripts/seed_demo_urdu.js
fi

echo "Starting Madrassa Management System server..."
node server.js
