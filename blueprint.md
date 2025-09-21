---

### **MASSIVE & COMPREHENSIVE AI PROMPT: BUILD THE "BUNDLE" HACKATHON MVP**

**Objective:**
You are to act as a senior full-stack developer, UI/UX designer, and business strategist. Your mission is to generate all the assets required for a solo developer to win the Hedera Africa Hackathon 2025 with the project "Bundle." The final output must include a functional mobile app MVP, a robust backend, high-fidelity mockups, and a compelling pitch deck.

The strategy is "App-First, Web-Vision." We will build a polished mobile app for the core consumer features and create mockups for the visionary B2B web platform.

---

### **PART 1: THE DESIGN PHASE (FIGMA)**

**Goal:** Create a clean, intuitive, and modern design system for Bundle. The theme should be trustworthy, efficient, and slightly futuristic. Use a color palette of a deep blue (`#0D1B2A`), a clean white (`#FFFFFF`), a vibrant accent color for calls-to-action (e.g., a bright green `#00F5D4`), and shades of grey for text and backgrounds.

**Task 1.1: Mobile App UI/UX Design (for Development)**
Create a high-fidelity, clickable prototype in Figma for the "Bundle" mobile app. It must contain the following screens and components:

1.  **Onboarding/Login Screen:**
    *   App Logo: A simple, abstract "B" that suggests bundling or connecting.
    *   Headline: "Spend Crypto on Anything in Nigeria."
    *   Primary Button: "Connect Wallet."
2.  **Home Screen (Dashboard):**
    *   Header: "Welcome back!"
    *   Main Display: A large card showing the user's connected Hedera Account ID and their available **USDC balance**.
    *   Quick Actions Grid (using icons):
        *   "Buy Airtime"
        *   "Pay Bills" (shows electricity, TV icons)
        *   "Bank Transfer"
        *   "Vouchers"
    *   A simple list of "Recent Transactions."
3.  **Buy Airtime Flow:**
    *   **Screen 1 (Input):**
        *   Field for "Phone Number."
        *   Field for "Amount (NGN)."
        *   A list of common amounts (e.g., ₦500, ₦1000, ₦2000).
        *   A real-time display below: "Cost: ~X.XX USDC."
        *   Button: "Proceed."
    *   **Screen 2 (Confirmation Modal):**
        *   Summary: "You are sending ₦1,000 Airtime to 08012345678."
        *   Cost Breakdown: "Total Cost: ~0.85 USDC."
        *   Button: "Confirm & Pay."
4.  **Pay by Bank Transfer Flow (The Killer Feature):**
    *   **Screen 1 (Input):**
        *   Field for "Amount (NGN)."
        *   Dropdown for "Bank Name."
        *   Field for "Account Number."
        *   **Crucially:** As the user types the account number, a loading spinner appears, and upon completion, a green checkmark and the verified **Account Name** ("Mama J's Kitchen") are displayed. This is the trust signal.
        *   Button: "Proceed."
    *   **Screen 2 (Confirmation Modal):**
        *   Summary: "You are sending ₦12,500 to Mama J's Kitchen."
        *   Cost Breakdown: "Total Cost: ~10.60 USDC."
        *   Button: "Confirm & Pay."
5.  **Success Screen:** A generic success screen with a large checkmark, displaying the details of the completed transaction (e.g., "You successfully purchased your ₦1,000 electricity token!").

**Task 1.2: Web App B2B Dashboard Design (for Mockups)**
Create two high-fidelity screens in Figma for the "Bundle for Business" web dashboard. This is for the pitch deck only.

1.  **Dashboard Analytics Screen:**
    *   Show a professional dashboard with charts and graphs for "Total Spend," "Categorized Expenses (Airtime, Bills, etc.)," and "Average Transaction Cost."
    *   Display a list of recent business transactions.
    *   Include a prominent "API Status: All Systems Operational" indicator.
2.  **Bulk Payments Screen:**
    *   Show a clean interface with an "Upload CSV" button for bulk airtime payments.
    *   Display a table showing employee names, phone numbers, and status ("Pending," "Complete").
    *   Include a "Download Sample CSV" link.

---

### **PART 2: THE DEVELOPMENT PHASE - BACKEND (NODE.JS & EXPRESS)**

**Goal:** Build the secure and efficient backend engine. Use Node.js, Express, and the Hedera SDK. Structure the code into modules: `hederaService`, `paymentProviderService`, `apiRoutes`.

**Task 2.1: Initial Setup**
*   Initialize a Node.js project. Install `express`, `dotenv`, `@hashgraph/sdk`.
*   Set up a basic Express server with routes for `/rate`, `/sponsor-transaction`, and `/transaction-callback`.
*   Use `dotenv` to manage environment variables: `HEDERA_ACCOUNT_ID`, `HEDERA_PRIVATE_KEY`, `PAYSTACK_SECRET_KEY`, `TREASURY_ACCOUNT_ID`.

**Task 2.2: Hedera Service (`hederaService.js`)**
1.  **`getClient()`:** A function that initializes and returns a configured Hedera Testnet client.
2.  **`sponsorTransaction(unsignedTxBytes)`:**
    *   Takes the raw bytes of an unsigned transaction from the frontend.
    *   Deserializes it using `Transaction.fromBytes()`.
    *   Freezes the transaction with the backend client.
    *   Signs it with the backend's private key (as the `feePayer`).
    *   Serializes the partially signed transaction back to bytes and returns it to the frontend.
3.  **`listenForConfirmation(txId)`:**
    *   Implement a function that uses a `TransactionRecordQuery` to poll the Hedera network for the result of a specific transaction ID.
    *   This function should be asynchronous and resolve only when it confirms a `SUCCESS` status. This is the trigger for the fiat payment.

**Task 2.3: Payment Provider Service (`paymentProviderService.js`)**
1.  **Integrate Paystack Sandbox API:** Use a library like `axios` to interact with Paystack.
2.  **`resolveBankAccount(accountNumber, bankCode)`:**
    *   Implement the function to call Paystack's "Resolve Account Number" API.
    *   Return the `account_name` on success or an error on failure. This is for the real-time verification feature.
3.  **`executeAirtimePurchase(phoneNumber, amount)`:**
    *   Implement the API call to a provider's (e.g., Paystack's) airtime endpoint.
    *   Return a success or failure status.
4.  **`executeBankTransfer(accountNumber, bankCode, amount, reason)`:**
    *   Implement the API calls to first create a "Transfer Recipient" on Paystack and then initiate the actual transfer.
    *   Return a success or failure status.

**Task 2.4: API Routes (`apiRoutes.js`)**
1.  **`POST /sponsor-transaction`:** The endpoint that the mobile app calls. It receives the unsigned transaction, passes it to `hederaService.sponsorTransaction`, and returns the partially signed transaction.
2.  **`POST /initiate-payment`:**
    *   This is the main endpoint. It receives the payment type (airtime/transfer), details (phone number, amount, etc.), and the **Hedera Transaction ID** that the user just submitted.
    *   It calls `hederaService.listenForConfirmation(txId)`.
    *   **Crucially:** Once `listenForConfirmation` resolves, it then calls the appropriate function from `paymentProviderService` (e.g., `executeBankTransfer`).
    *   It then returns the final status to the mobile app.

---

### **PART 3: THE DEVELOPMENT PHASE - MOBILE APP (REACT NATIVE & EXPO)**

**Goal:** Build the user-facing mobile app based on the Figma designs. It must be polished and function flawlessly.

**Task 3.1: Initial Setup**
*   Initialize a new project using `create-expo-app`.
*   Install necessary libraries: `axios`, `@hashgraph/sdk`, `hashconnect`.
*   Set up navigation (e.g., React Navigation) for the screens defined in the Figma design.

**Task 3.2: Hedera Wallet Integration (`WalletContext.js`)**
*   Create a React Context to manage the wallet connection state.
*   Implement `hashconnect` logic to:
    *   Initialize and pair with a wallet (HashPack).
    *   Store the user's account ID and pairing data.
    *   Provide functions for `connect()` and `disconnect()`.
    *   Provide a function `sendTransaction(txBytes)` which takes the partially signed transaction from the backend, asks the user to sign it with their wallet, and submits it to the network.

**Task 3.3: Building the UI & Logic**
1.  **Implement the Screens:** Build the React Native components for all screens from the Figma designs.
2.  **State Management:** Use `useState` or a simple state management library to handle form inputs and UI state.
3.  **Core Transaction Flow:**
    *   On the "Confirm & Pay" button press:
        1.  Create an unsigned `TransferTransaction` in the app to send the correct USDC amount from the user's account to your `TREASURY_ACCOUNT_ID`.
        2.  Serialize this transaction to bytes (`tx.toBytes()`).
        3.  Send these bytes to your backend's `/sponsor-transaction` endpoint.
        4.  Receive the partially signed transaction bytes back from the backend.
        5.  Call the `walletContext.sendTransaction()` function with these bytes, which will prompt the user to sign in HashPack.
        6.  Once the wallet confirms the transaction is sent, get the `transactionId`.
        7.  Immediately call your backend's `/initiate-payment` endpoint with the `transactionId` and payment details.
        8.  Show a loading indicator until the backend confirms the entire flow is complete.
        9.  Navigate to the Success Screen.

---

### **PART 4: THE PITCH DECK & PRESENTATION**

**Goal:** Create a professional 5-slide pitch deck and a script for a 3-minute video demo that sells the grand vision.

**Task 4.1: The Pitch Deck (Generate content for 5 slides)**

*   **Slide 1: The Problem.**
    *   **Title:** The Disconnect.
    *   **Content:** "Nigeria has one of the world's most vibrant crypto economies. Yet, using this digital value for daily life is slow, expensive, and complex. The bridge between Web3 earnings and real-world expenses is broken." (Use icons representing crypto and everyday items like food/rent with a broken line between them).
*   **Slide 2: The Solution: Bundle.**
    *   **Title:** Bundle: The OpenRouter for Fiat.
    *   **Content:** "A non-custodial mobile app that acts as a universal translation layer. We connect the global liquidity of stablecoins on Hedera to Nigeria's entire digital commerce infrastructure, instantly and securely." (Show the Bundle app logo in the middle, with USDC/Hedera icons flowing in, and Airtime/Bank/Jumia icons flowing out).
*   **Slide 3: The Demo.**
    *   **Title:** See It in Action.
    *   **Content:** This slide will just have a large, auto-playing placeholder for your flawless 90-second video demo.
*   **Slide 4: Why We Win (The Super-App Ecosystem).**
    *   **Title:** A Multi-Track Winning Strategy.
    *   **Content:** Use four quadrants, one for each hackathon track.
        *   **Onchain Finance:** "Flawless stablecoin off-ramping for daily use."
        *   **DLT for Operations:** "Our B2B API and Web Dashboard will automate corporate expenses." (Show the B2B mockup).
        *   **Immersive Experience:** "NFT loyalty badges and DeFi savings vaults will drive user retention." (Show a conceptual mockup of this).
        *   **AI & DePIN:** "Our core moat is an AI-powered routing engine that ensures the cheapest, most reliable payment path." (Show a simple diagram of the router).
*   **Slide 5: The Vision.**
    *   **Title:** The Future is Bundled.
    *   **Content:** "We are not just building an app; we are building a fundamental piece of new financial infrastructure. Our vision is to become the default gateway for all Web3 value to interact with the African economy."

**Task 4.2: The 3-Minute Video Script**
*   **[0:00-0:15]** "This is my Hedera wallet. I have 50 USDC. But how do I use it to buy lunch in Lagos? Today, it's a slow process of P2P sales and bank transfers. We can do better."
*   **[0:15-1:30]** (Screen recording of the app) "This is Bundle. I connect my wallet once. Now, I need to pay my electricity bill. I enter the details, Bundle verifies the meter, and shows me the cost in USDC. I tap confirm, approve in my secure wallet... and that's it. Payment complete. Here is the token."
*   **[1:30-2:30]** "But what about paying a local food vendor? Bundle can do that too. I just need their bank details. I enter the amount, and Bundle verifies I'm paying the right person. I confirm, approve... and the vendor gets a standard Naira bank alert instantly. They don't even know crypto was involved."
*   **[2:30-3:00]** "This is made possible by Hedera's speed and low fees, combined with our 'OpenRouter for Fiat' backend. Bundle is more than an app; it's the bridge to the future of finance in Africa. Thank you."

---
**Final Instruction:** Execute these tasks sequentially. The final deliverable should be a complete package: Figma design files, a zipped folder with the organized backend and frontend code, and the pitch deck in PDF format.