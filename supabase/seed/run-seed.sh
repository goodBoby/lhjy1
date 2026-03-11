#!/bin/bash

# Seed script for ChinaMediGuide database
# This script seeds the database with realistic medical data for MVP testing

echo "Starting database seeding for ChinaMediGuide..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "Error: Supabase CLI is not installed. Please install it first."
    echo "Installation: npm install -g supabase"
    exit 1
fi

# Check if we're in a Supabase project
if [ ! -f "supabase/config.toml" ]; then
    echo "Error: Not in a Supabase project directory."
    echo "Please run this script from the project root."
    exit 1
fi

echo "1. Starting Supabase local development..."
supabase start

echo "2. Running migrations..."
supabase db reset --db-url="postgresql://postgres:postgres@localhost:54322/postgres"

echo "3. Seeding hospitals data..."
psql -h localhost -p 54322 -U postgres -d postgres -f supabase/seed/hospitals.sql

echo "4. Seeding doctors data..."
psql -h localhost -p 54322 -U postgres -d postgres -f supabase/seed/doctors.sql

echo "5. Generating TypeScript types..."
npm run db:generate

echo "✅ Database seeding completed successfully!"
echo ""
echo "Summary:"
echo "- 10 hospitals with multilingual support"
echo "- 30 doctors across various specialties"
echo "- Doctor availability schedules"
echo "- TypeScript types generated"
echo ""
echo "You can now run: npm run dev"
echo "Visit: http://localhost:3000"