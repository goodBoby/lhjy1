@echo off
REM ChinaMediGuide - Push to GitHub Script
REM Run this script to push your code to GitHub

cd /d "%~dp0"

echo Pushing to GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Successfully pushed to GitHub!
    echo.
    echo Next step: Deploy to Vercel
    echo Run: vercel --prod
) else (
    echo.
    echo Push failed. Please check your GitHub authentication.
    echo Run: gh auth login
)

pause
