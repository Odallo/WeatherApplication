#!/bin/bash

# Set the Laravel project name
PROJECT_NAME="backend"

# Optional: specify a Laravel version (e.g., ^10.0), or leave blank for latest
LARAVEL_VERSION="^10.0"

echo "🚀 Creating Laravel project: $PROJECT_NAME"

# Step 1: Create Laravel project
composer create-project laravel/laravel:$LARAVEL_VERSION $PROJECT_NAME

cd $PROJECT_NAME || { echo "❌ Failed to enter project directory"; exit 1; }

# Step 2: Create .env and generate app key
cp .env.example .env
php artisan key:generate

# Step 3: Install dependencies
composer install

# Step 4: Check important files and folders
echo "🔍 Verifying Laravel structure..."
REQUIRED_PATHS=("artisan" ".env" "app/Http/Kernel.php" "routes/api.php" "public/index.php" "vendor")

MISSING=false
for path in "${REQUIRED_PATHS[@]}"; do
    if [ ! -e "$path" ]; then
        echo "❌ Missing: $path"
        MISSING=true
    else
        echo "✅ Found: $path"
    fi
done

if $MISSING; then
    echo "⚠️ Laravel installation incomplete. Please check your Composer or internet connection."
    exit 1
else
    echo "✅ Laravel installed successfully!"
fi

# Step 5: Serve the app
echo "🌐 Starting Laravel server..."
php artisan serve
