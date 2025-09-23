#!/bin/bash

# Function to setup env files for a directory
setup_env() {
    local dir=$1
    local env_file="$dir/.env"
    local example_file="$dir/.env.example"
    
    # If local .env doesn't exist
    if [ ! -f "$env_file" ]; then
        # If root .env exists, copy it
        if [ -f ".env" ]; then
            echo "Copying root .env to $dir/"
            cp .env "$env_file"
        # If no root .env but .env.example exists, copy example
        elif [ -f "$example_file" ]; then
            echo "Creating $dir/.env from example"
            cp "$example_file" "$env_file"
        fi
    else
        echo "Using existing $dir/.env"
    fi
}

# Create frontend .env.example if it doesn't exist
cat > frontend/.env.example << EOL
# Frontend Environment Variables
VITE_PROJECT_ID=your_project_id_here
VITE_APP_NAME=Bundle
VITE_APP_DESCRIPTION="Spend Crypto on Anything in Nigeria"
VITE_APP_URL=your_app_url_here
VITE_APP_ICON=your_app_icon_url_here
VITE_TREASURY_ADDRESS=your_treasury_address_here
VITE_API_URL=http://localhost:3000/api
EOL

# Create backend .env.example if it doesn't exist
cat > backend/.env.example << EOL
# Backend Environment Variables
TREASURY_ADDRESS=your_treasury_address_here
PAYSTACK_SECRET_KEY=your_paystack_secret_key_here
FRONTEND_URL=http://localhost:5173  # For local development
EOL

# Setup env files
setup_env "frontend"
setup_env "backend"

echo "Environment setup complete!"