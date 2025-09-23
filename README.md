# Bundle

A hybrid payment system integrating Hedera blockchain with traditional payment methods.

## Environment Setup

You have two options for environment configuration:

### Option 1: Single Shared Environment (Recommended for Production)

1. Copy the root example environment file:
```bash
cp .env.example .env
```

2. Update the root `.env` file with your configuration.

### Option 2: Separate Environments (Recommended for Development)

For independent frontend/backend development, you can maintain separate environment files:

```bash
# Frontend only
cd frontend
cp .env.example .env
# Edit frontend/.env with your frontend variables

# Backend only
cd backend
cp .env.example .env
# Edit backend/.env with your backend variables
```

The setup script will automatically:
1. Use local `.env` if it exists
2. Fall back to root `.env` if no local file exists
3. Create from `.env.example` if neither exists

### Required Environment Variables:

Shared:
- `TREASURY_ADDRESS`: Your Hedera EVM treasury address

Frontend:
- `VITE_PROJECT_ID`: Your AppKit project ID
- `VITE_APP_URL`: Your application URL

Backend:
- `PAYSTACK_SECRET_KEY`: Your Paystack secret key

### Optional Environment Variables:

Frontend:
- `VITE_APP_NAME`: Application name (default: "Bundle")
- `VITE_APP_DESCRIPTION`: Application description
- `VITE_APP_ICON`: Application icon URL

## Development

1. Install dependencies:
```bash
npm install
cd frontend && npm install
cd backend && npm install
```

2. Start development servers:
```bash
npm run dev
```

This will automatically:
- Set up environment file symlinks
- Start both frontend and backend servers concurrently

## API Endpoints

```bash
# Initiate a payment
curl -v -X POST http://localhost:3000/api/initiate-payment -H "Content-Type: application/json" -d @payment.json
```