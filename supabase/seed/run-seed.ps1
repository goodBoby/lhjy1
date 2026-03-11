# PowerShell seed script for ChinaMediGuide database
# This script seeds the database with realistic medical data for MVP testing

Write-Host "Starting database seeding for ChinaMediGuide..." -ForegroundColor Green

# Check if Supabase CLI is installed
try {
    $null = Get-Command supabase -ErrorAction Stop
    Write-Host "✓ Supabase CLI is installed" -ForegroundColor Green
} catch {
    Write-Host "Error: Supabase CLI is not installed." -ForegroundColor Red
    Write-Host "Installation: npm install -g supabase" -ForegroundColor Yellow
    exit 1
}

# Check if we're in a Supabase project
if (-not (Test-Path "supabase/config.toml")) {
    Write-Host "Error: Not in a Supabase project directory." -ForegroundColor Red
    Write-Host "Please run this script from the project root." -ForegroundColor Yellow
    exit 1
}

Write-Host "1. Starting Supabase local development..." -ForegroundColor Cyan
supabase start

Write-Host "2. Running migrations..." -ForegroundColor Cyan
supabase db reset --db-url="postgresql://postgres:postgres@localhost:54322/postgres"

Write-Host "3. Seeding hospitals data..." -ForegroundColor Cyan
psql -h localhost -p 54322 -U postgres -d postgres -f supabase/seed/hospitals.sql

Write-Host "4. Seeding doctors data..." -ForegroundColor Cyan
psql -h localhost -p 54322 -U postgres -d postgres -f supabase/seed/doctors.sql

Write-Host "5. Generating TypeScript types..." -ForegroundColor Cyan
npm run db:generate

Write-Host "`n✅ Database seeding completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "- 10 hospitals with multilingual support" -ForegroundColor White
Write-Host "- 30 doctors across various specialties" -ForegroundColor White
Write-Host "- Doctor availability schedules" -ForegroundColor White
Write-Host "- TypeScript types generated" -ForegroundColor White
Write-Host ""
Write-Host "You can now run: npm run dev" -ForegroundColor Yellow
Write-Host "Visit: http://localhost:3000" -ForegroundColor Yellow