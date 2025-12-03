#!/usr/bin/env powershell
<#
MongoDB Quick Setup Script for BevShop
This script helps you set up MongoDB for local development
#>

param(
    [string]$Choice = ""
)

function Show-Menu {
    Clear-Host
    Write-Host "╔════════════════════════════════════════════════════╗"
    Write-Host "║         MongoDB Setup for BevShop                  ║"
    Write-Host "╚════════════════════════════════════════════════════╝"
    Write-Host ""
    Write-Host "Select MongoDB Setup Method:"
    Write-Host ""
    Write-Host "1. MongoDB Atlas (Cloud) - RECOMMENDED"
    Write-Host "   ✅ No installation needed"
    Write-Host "   ✅ Free tier available (512MB)"
    Write-Host "   ✅ Cloud managed"
    Write-Host ""
    Write-Host "2. Local MongoDB (Windows)"
    Write-Host "   ✅ Install on your computer"
    Write-Host "   ⚠️  Requires installation"
    Write-Host "   ✅ Full control"
    Write-Host ""
    Write-Host "3. Docker MongoDB"
    Write-Host "   ⚠️  Requires Docker installed"
    Write-Host "   ✅ Container based"
    Write-Host ""
    Write-Host "4. Check MongoDB Connection"
    Write-Host "   ✅ Test current connection"
    Write-Host ""
    Write-Host "5. View Setup Guide"
    Write-Host "   ✅ Read detailed documentation"
    Write-Host ""
    Write-Host "6. Exit"
    Write-Host ""
}

function Test-MongoConnection {
    Write-Host "Testing MongoDB connection..." -ForegroundColor Yellow
    Write-Host ""
    
    # Try to connect to local MongoDB
    try {
        Write-Host "Checking local MongoDB..." -ForegroundColor Cyan
        $result = mongosh --eval "db.version()" 2>&1
        
        if ($result -match "error|Error|ERROR") {
            Write-Host "❌ Local MongoDB not running" -ForegroundColor Red
            Write-Host ""
            Write-Host "To start MongoDB:"
            Write-Host "  net start MongoDB" -ForegroundColor Green
            Write-Host ""
        } else {
            Write-Host "✅ Local MongoDB is running!" -ForegroundColor Green
            Write-Host "Version: $result" -ForegroundColor Green
            Write-Host ""
        }
    } catch {
        Write-Host "❌ mongosh not found or MongoDB not installed" -ForegroundColor Red
        Write-Host ""
        Write-Host "If using MongoDB Atlas, that's fine!" -ForegroundColor Yellow
        Write-Host "Check your MONGODB_URI in backend/.env" -ForegroundColor Yellow
        Write-Host ""
    }
    
    # Check .env file
    Write-Host "Checking backend/.env..." -ForegroundColor Cyan
    $envPath = "$PSScriptRoot\backend\.env"
    
    if (Test-Path $envPath) {
        $content = Get-Content $envPath
        $mongoUri = $content | Select-String "MONGODB_URI"
        
        if ($mongoUri) {
            Write-Host "✅ MONGODB_URI found in .env" -ForegroundColor Green
            Write-Host "   $mongoUri" -ForegroundColor Green
        } else {
            Write-Host "❌ MONGODB_URI not found in .env" -ForegroundColor Red
            Write-Host "   Please add it to backend/.env" -ForegroundColor Yellow
        }
    } else {
        Write-Host "❌ backend/.env not found" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "Press any key to continue..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

function Show-AtlasSetup {
    Clear-Host
    Write-Host "╔════════════════════════════════════════════════════╗"
    Write-Host "║     MongoDB Atlas Setup (Recommended)             ║"
    Write-Host "╚════════════════════════════════════════════════════╝"
    Write-Host ""
    Write-Host "STEP 1: Sign Up at MongoDB Atlas"
    Write-Host "  1. Go to: https://www.mongodb.com/cloud/atlas"
    Write-Host "  2. Click 'Sign Up'"
    Write-Host "  3. Create account with email/password"
    Write-Host "  4. Verify your email"
    Write-Host ""
    
    Write-Host "STEP 2: Create Free Cluster"
    Write-Host "  1. Click 'Create a Cluster'"
    Write-Host "  2. Select 'M0 (Free)' tier"
    Write-Host "  3. Choose your region"
    Write-Host "  4. Click 'Create Cluster' (wait 1-3 minutes)"
    Write-Host ""
    
    Write-Host "STEP 3: Add Database User"
    Write-Host "  1. Go to 'Database Access'"
    Write-Host "  2. Click 'Add Database User'"
    Write-Host "  3. Username: admin"
    Write-Host "  4. Password: (generate strong password)"
    Write-Host "  5. Click 'Add User'"
    Write-Host ""
    
    Write-Host "STEP 4: Whitelist IP"
    Write-Host "  1. Go to 'Network Access'"
    Write-Host "  2. Click 'Add IP Address'"
    Write-Host "  3. Enter: 0.0.0.0/0"
    Write-Host "  4. Click 'Confirm'"
    Write-Host ""
    
    Write-Host "STEP 5: Get Connection String"
    Write-Host "  1. Click 'Connect' on cluster"
    Write-Host "  2. Select 'Connect your application'"
    Write-Host "  3. Copy the connection string"
    Write-Host "  4. Replace <username> and <password>"
    Write-Host ""
    
    Write-Host "STEP 6: Update .env File"
    Write-Host "  Location: backend/.env"
    Write-Host "  Add: MONGODB_URI=mongodb+srv://admin:password@cluster.mongodb.net/beverage-ecommerce"
    Write-Host ""
    
    Write-Host "STEP 7: Restart Backend"
    Write-Host "  Run: cd backend && npm run dev"
    Write-Host ""
    
    Write-Host "Need help?"
    Write-Host "  Full guide: MONGODB_SETUP.md"
    Write-Host ""
    
    Write-Host "Press any key to continue..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

function Show-LocalSetup {
    Clear-Host
    Write-Host "╔════════════════════════════════════════════════════╗"
    Write-Host "║     Local MongoDB Setup (Windows)                 ║"
    Write-Host "╚════════════════════════════════════════════════════╝"
    Write-Host ""
    Write-Host "STEP 1: Download MongoDB"
    Write-Host "  1. Go to: https://www.mongodb.com/try/download/community"
    Write-Host "  2. Select Windows MSI package"
    Write-Host "  3. Click Download"
    Write-Host ""
    
    Write-Host "STEP 2: Install MongoDB"
    Write-Host "  1. Run the .msi file"
    Write-Host "  2. Click Next until 'Service Configuration'"
    Write-Host "  3. Check 'Install MongoDB as a Service'"
    Write-Host "  4. Continue and Install"
    Write-Host ""
    
    Write-Host "STEP 3: Start MongoDB"
    Write-Host "  Run this command in PowerShell (as Administrator):"
    Write-Host ""
    Write-Host "    net start MongoDB" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "STEP 4: Connect with mongosh"
    Write-Host "  Open PowerShell and run:"
    Write-Host ""
    Write-Host "    mongosh" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "STEP 5: Create Database"
    Write-Host "  In mongosh, run:"
    Write-Host ""
    Write-Host "    use beverage-ecommerce" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "STEP 6: Update .env File"
    Write-Host "  Location: backend/.env"
    Write-Host "  Set: MONGODB_URI=mongodb://localhost:27017/beverage-ecommerce"
    Write-Host ""
    
    Write-Host "STEP 7: Restart Backend"
    Write-Host "  Run: cd backend && npm run dev"
    Write-Host ""
    
    Write-Host "Need help?"
    Write-Host "  Full guide: MONGODB_SETUP.md"
    Write-Host ""
    
    Write-Host "Press any key to continue..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

function Show-DockerSetup {
    Clear-Host
    Write-Host "╔════════════════════════════════════════════════════╗"
    Write-Host "║     Docker MongoDB Setup                          ║"
    Write-Host "╚════════════════════════════════════════════════════╝"
    Write-Host ""
    Write-Host "STEP 1: Install Docker"
    Write-Host "  1. Go to: https://www.docker.com/products/docker-desktop"
    Write-Host "  2. Download Docker Desktop for Windows"
    Write-Host "  3. Run installer and follow steps"
    Write-Host ""
    
    Write-Host "STEP 2: Run MongoDB Container"
    Write-Host "  Open PowerShell and run:"
    Write-Host ""
    Write-Host "    docker run -d ``" -ForegroundColor Green
    Write-Host "      --name mongodb ``" -ForegroundColor Green
    Write-Host "      -p 27017:27017 ``" -ForegroundColor Green
    Write-Host "      -e MONGO_INITDB_ROOT_USERNAME=admin ``" -ForegroundColor Green
    Write-Host "      -e MONGO_INITDB_ROOT_PASSWORD=password123 ``" -ForegroundColor Green
    Write-Host "      mongo:latest" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "STEP 3: Verify Container Running"
    Write-Host "  Run:"
    Write-Host ""
    Write-Host "    docker ps" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "STEP 4: Update .env File"
    Write-Host "  Location: backend/.env"
    Write-Host "  Set: MONGODB_URI=mongodb://admin:password123@localhost:27017/beverage-ecommerce?authSource=admin"
    Write-Host ""
    
    Write-Host "STEP 5: Restart Backend"
    Write-Host "  Run: cd backend && npm run dev"
    Write-Host ""
    
    Write-Host "Need help?"
    Write-Host "  Full guide: MONGODB_SETUP.md"
    Write-Host ""
    
    Write-Host "Press any key to continue..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

function Show-Guide {
    if ($IsWindows -or $PSVersionTable.Platform -eq 'Win32NT') {
        Start-Process "MONGODB_SETUP.md"
    } else {
        Write-Host "Opening MONGODB_SETUP.md..."
        Write-Host "Location: ./MONGODB_SETUP.md"
    }
    
    Write-Host ""
    Write-Host "Press any key to continue..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

# Main loop
do {
    Show-Menu
    
    if ([string]::IsNullOrEmpty($Choice)) {
        $Choice = Read-Host "Enter your choice (1-6)"
    }
    
    switch ($Choice) {
        "1" { Show-AtlasSetup }
        "2" { Show-LocalSetup }
        "3" { Show-DockerSetup }
        "4" { Test-MongoConnection }
        "5" { Show-Guide }
        "6" { 
            Write-Host "Goodbye!"
            exit
        }
        default { 
            Write-Host "Invalid choice. Please try again." -ForegroundColor Red
            Start-Sleep -Seconds 2
        }
    }
    
    $Choice = ""
    
} while ($true)
