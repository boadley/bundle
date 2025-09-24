# Bundle Codebase Analysis

## Overview
Bundle is a hybrid payment system that integrates Hedera blockchain with traditional payment methods, allowing users to spend cryptocurrency on everyday services in Nigeria. The application follows a modern full-stack architecture with a React frontend and Node.js backend.

## Tech Stack

### Frontend
- **Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 5.3.1
- **Styling**: Tailwind CSS 3.4.4
- **Blockchain Integration**: 
  - Reown AppKit 1.7.3 (wallet connection)
  - Wagmi 2.17.2 (Ethereum interactions)
  - Viem 2.37.7 (low-level Ethereum utilities)
  - Ethers.js 6.15.0
- **State Management**: TanStack React Query 5.90.1
- **UI Components**: React Hot Toast for notifications
- **HTTP Client**: Axios 1.12.2

### Backend
- **Runtime**: Node.js with Express 5.1.0
- **Blockchain**: Hashgraph SDK 2.73.1 (Hedera integration)
- **Payment Processing**: Paystack integration
- **Utilities**: CORS, dotenv, UUID generation
- **Development**: Nodemon for hot reloading

## Architecture

### Frontend Structure
```
frontend/src/
├── components/          # Reusable UI components
│   ├── AirtimeForm.tsx
│   ├── BankTransferForm.tsx
│   ├── Button.tsx
│   ├── ConnectWalletButton.tsx
│   └── Header.tsx
├── pages/              # Main application pages
│   ├── HomePage.tsx
│   └── LoginPage.tsx
├── services/           # API communication
│   └── apiService.ts
├── hooks/              # Custom React hooks
│   └── useBundle.ts
├── utils/              # Utility functions
├── config.ts           # Environment configuration
└── main.tsx           # Application entry point
```

### Backend Structure
```
backend/src/
├── routes/             # API route definitions
│   └── apiRoutes.js
├── services/           # Business logic
│   ├── hederaService.js
│   └── paymentProviderService.js
└── app.js             # Express server setup
```

## Key Features

### Blockchain Integration
- **Hedera Testnet Support**: Custom network configuration (Chain ID: 296)
- **EVM Compatibility**: Uses Wagmi for Ethereum-style transactions on Hedera
- **Wallet Connection**: Reown AppKit for multi-wallet support
- **Transaction Verification**: Backend validates blockchain transactions before processing payments

### Payment Types
1. **Airtime Purchase**: Buy mobile airtime using crypto
2. **Bank Transfers**: Send money to Nigerian bank accounts
3. **Bill Payments**: Electricity and TV subscriptions (planned)

### Security & Validation
- **Transaction Verification**: Backend verifies blockchain transactions before processing
- **Environment Validation**: Required environment variables are checked at startup
- **CORS Configuration**: Proper cross-origin setup for development and production

## Development Setup

### Environment Configuration
The project supports flexible environment management:
- **Shared Environment**: Single `.env` file at root
- **Separate Environments**: Individual `.env` files for frontend/backend
- **Automatic Setup**: `setup-env.sh` script handles environment file creation

### Required Environment Variables
```bash
# Shared
TREASURY_ADDRESS=your_hedera_treasury_address

# Frontend (VITE_ prefix required)
VITE_PROJECT_ID=your_appkit_project_id
VITE_TREASURY_ADDRESS=your_treasury_address

# Backend
PAYSTACK_SECRET_KEY=your_paystack_secret_key
```

### Development Commands
```bash
npm install                    # Install root dependencies
npm run dev                   # Start both frontend and backend
npm run build                 # Build both applications
```

## Key Patterns & Conventions

### State Management
- **React Query**: Server state management and caching
- **Wagmi Hooks**: Blockchain state and transaction management
- **Custom Hooks**: `useBundle` encapsulates payment logic

### Error Handling
- **Toast Notifications**: User-friendly error messages
- **Retry Logic**: Automatic retry for failed operations
- **Validation**: Input validation on both frontend and backend

### Code Organization
- **Service Layer**: Clear separation between API calls and business logic
- **Component Composition**: Reusable UI components with consistent styling
- **Configuration Management**: Centralized config with environment validation

## Critical Developer Notes

1. **Blockchain Network**: Uses Hedera Testnet (Chain ID 296) with custom RPC configuration
2. **Payment Flow**: Crypto transaction → Backend verification → Traditional payment execution
3. **CORS Setup**: Pre-configured for Gitpod development environments
4. **Environment Setup**: Run `npm run setup` to automatically configure environment files
5. **Treasury Address**: Central treasury receives all crypto payments before processing traditional payments

The codebase follows modern React and Node.js best practices with a focus on blockchain integration and payment processing reliability.