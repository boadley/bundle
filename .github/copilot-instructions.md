# AI Agent Instructions for Bundle Project

## Project Overview
Bundle is a hybrid payment system integrating Hedera blockchain with traditional payment methods (bank transfers and airtime purchases). The architecture consists of:

- Frontend: React/TypeScript app using Vite
- Backend: Express.js server handling payment processing and Hedera interactions

## Key Architecture Patterns

### Frontend Components
- Uses AppKit for wallet connection and Wagmi for transaction handling
- Major components in `frontend/src/components/`:
  - `ConnectWalletButton.tsx`: Handles wallet connections
  - `BankTransferForm.tsx`/`AirtimeForm.tsx`: Payment type-specific forms

### Backend Services
- `hederaService.js`: Handles Hedera blockchain interactions (transaction sponsoring)
- `paymentProviderService.js`: Manages traditional payment processing
- API routes in `apiRoutes.js` connect these services

### Data Flow
1. User initiates payment through frontend forms
2. Minimal Hedera transaction (1 wei) sent to treasury address
3. Backend confirms Hedera transaction
4. Backend executes corresponding traditional payment

## Development Workflow

### Local Setup
```bash
# Backend setup
cd backend
npm install
npm run dev  # Starts on port 3000

# Frontend setup
cd frontend
npm install
npm run dev  # Starts Vite dev server
```

### Testing API Endpoints
Example test payloads in root directory:
```bash
curl -v -X POST http://localhost:3000/api/sponsor-transaction -H "Content-Type: application/json" -d @transaction.json
curl -v -X POST http://localhost:3000/api/resolve-account -H "Content-Type: application/json" -d @account.json
curl -v -X POST http://localhost:3000/api/initiate-payment -H "Content-Type: application/json" -d @payment.json
```

## Project-Specific Conventions

### Environment Configuration
- Frontend uses Vite env vars (see `frontend/.env`)
  - Required: `VITE_TREASURY_ACCOUNT_ID` for Hedera treasury address
- Backend uses standard Node.js env vars
  - Default port: 3000

### Transaction Handling
1. All Hedera transactions are sponsored through backend
2. Transaction bytes are base64 encoded for API transfer
3. Payment confirmation waits for Hedera consensus before proceeding

### Error Handling
- Frontend uses `react-hot-toast` for user notifications
- Backend returns structured error responses:
  ```json
  { "error": "specific error message" }
  ```

## Integration Points
- Hedera network (via backend)
- Payment provider API (in `paymentProviderService.js`)
- AppKit wallet connection
- Wagmi transaction management