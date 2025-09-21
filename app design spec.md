Of course. Here is the detailed UI/UX design specification for the "Bundle" mobile app, acting as your senior UI/UX designer.

### **Bundle Mobile App: UI/UX Design Specification**

This document outlines the design system and screen-by-screen specifications for the Bundle mobile application. The design prioritizes clarity, trust, and efficiency, creating a seamless experience for users to bridge their digital assets with everyday Nigerian commerce.

---

### **1. Design System**

#### **1.1. Color Palette**

The color palette is chosen to evoke a sense of security, professionalism, and modernity.

*   **Primary/Background (`#0D1B2A`):** A deep, dark blue that serves as the primary background for all screens. It's serious and professional, providing excellent contrast for text and interactive elements.
*   **Primary Text/Surface (`#FFFFFF`):** Pure white is used for all primary text, icons, and main content surfaces (like cards) to ensure maximum readability against the dark blue background.
*   **Accent/CTA (`#00F5D4`):** A vibrant, energetic mint green. This color is used exclusively for primary calls-to-action (CTAs) like "Connect Wallet," "Proceed," and "Confirm & Pay." Its high visibility guides the user to the most important actions.
*   **Secondary Text (`#A9B4C2`):** A light, soft grey for less important text, such as placeholder text in input fields, timestamps, or descriptive subtitles.
*   **Disabled State (`#5A6470`):** A muted, darker grey used for disabled buttons or inactive elements.
*   **Success (`#2ECC71`):** A standard, reassuring green for success indicators, like the verified account name checkmark and the final success screen icon.
*   **Error (`#E74C3C`):** A clear, standard red for error messages or failed transaction indicators.

#### **1.2. Typography**

The typography is clean, modern, and highly legible, using a sans-serif font family like **Inter** or **Poppins**.

*   **H1 / Display (32pt, Bold):** Used for major screen titles and large balance displays (e.g., the USDC balance on the home screen).
*   **H2 / Headline (24pt, Bold):** Used for section headers (e.g., "Welcome back!").
*   **H3 / Sub-Headline (18pt, Semi-Bold):** Used for card titles or important labels (e.g., "Recent Transactions").
*   **Body (16pt, Regular):** The standard text size for all paragraphs, list items, and general content.
*   **Button Text (16pt, Bold):** Used for all primary and secondary button labels.
*   **Input Text (16pt, Regular):** The size of text inside form fields.
*   **Caption (14pt, Regular):** Used for smaller, auxiliary text like the real-time USDC cost display or transaction details.

#### **1.3. Components**

*   **Buttons:**
    *   **Primary CTA:** Full-width, solid `#00F5D4` background, white (`#FFFFFF`) bold text, with rounded corners (12px radius).
    *   **Secondary/Link:** Plain white or accent green text, no background. Used for less critical actions like "Disconnect."
*   **Input Fields:**
    *   A rectangular container with a subtle, light grey border (`#5A6470`) and rounded corners (8px radius).
    *   When focused, the border color changes to the accent green (`#00F5D4`).
    *   Placeholder text uses the secondary grey (`#A9B4C2`).
*   **Cards:**
    *   Used for the main balance display and transaction items.
    *   A slightly lighter background than the main dark blue, perhaps a very dark grey (`#1F2A37`), with rounded corners (16px radius) to create a soft, layered effect.
*   **Icons:**
    *   Clean, line-art style. All icons are pure white (`#FFFFFF`) unless indicating a specific status (e.g., a green checkmark).
*   **Modals:**
    *   A full-screen overlay with a semi-transparent dark background (e.g., `#0D1B2A` at 80% opacity).
    *   The modal content appears in a centered card with the same styling as other cards.

---

### **2. Screen Specifications**

#### **2.1. Onboarding/Login Screen**

*   **Layout:** A vertically centered, single-column layout.
*   **Background:** Solid deep blue (`#0D1B2A`).
*   **Elements:**
    1.  **App Logo (Top):** A minimalist, abstract "B" logo in pure white (`#FFFFFF`). The logo is constructed from two overlapping shapes, suggesting a "bundle" or connection.
    2.  **Headline (Center):** The text "Spend Crypto on Anything in Nigeria." rendered in **H2 (24pt, Bold)** white text. The words "Anything" and "Nigeria" might be slightly larger or have a subtle emphasis.
    3.  **Primary Button (Bottom):** A full-width primary CTA button with the text "Connect Wallet."

#### **2.2. Home Screen (Dashboard)**

*   **Layout:** A top-to-bottom layout with clear visual hierarchy.
*   **Background:** Solid deep blue (`#0D1B2A`).
*   **Elements:**
    1.  **Header:** "Welcome back!" in **H2 (24pt, Bold)** white text, aligned to the left.
    2.  **Main Balance Card:**
        *   A large, prominent card with a dark grey (`#1F2A37`) background.
        *   **Top:** The user's Hedera Account ID (e.g., "0.0.123456") in **Caption (14pt, Regular)** secondary grey text.
        *   **Center:** The available balance (e.g., "$50.00") in **H1 (32pt, Bold)** white text.
        *   **Bottom:** The currency "USDC" in **Body (16pt, Regular)** secondary grey text.
    3.  **Quick Actions Grid:**
        *   A 2x2 grid of tappable icons. Each item consists of a white icon inside a circle and a **Caption (14pt, Regular)** white label below it.
        *   Icons: "Buy Airtime" (a phone icon), "Pay Bills" (a lightbulb icon), "Bank Transfer" (a bank building icon), "Vouchers" (a gift card icon).
    4.  **Recent Transactions List:**
        *   A sub-headline "Recent Transactions" in **H3 (18pt, Semi-Bold)** white text.
        *   A vertical list of transaction items. Each item is a row containing:
            *   **Left:** An icon representing the transaction type (e.g., phone for airtime).
            *   **Center:** The transaction description (e.g., "Airtime Purchase") in **Body (16pt, Regular)** and the recipient ("08012345678") in **Caption (14pt, Regular)** secondary grey.
            *   **Right:** The amount (e.g., "-₦1,000") in **Body (16pt, Regular)** white text.

#### **2.3. Buy Airtime Flow**

*   **Screen 1 (Input):**
    *   **Header:** "Buy Airtime" in **H2 (24pt, Bold)**.
    *   **Form:**
        *   **Phone Number Field:** A standard input field with the label "Phone Number."
        *   **Amount Field:** A standard input field with the label "Amount (NGN)."
        *   **Common Amounts:** A horizontal row of small, tappable chips (e.g., "₦500", "₦1000", "₦2000"). Tapping a chip populates the Amount field.
        *   **Real-time Cost Display:** Below the form, a line of text: "Cost: ~0.85 USDC" in **Caption (14pt, Regular)** secondary grey. This updates as the amount changes.
    *   **Button:** A full-width primary CTA button with the text "Proceed."

*   **Screen 2 (Confirmation Modal):**
    *   **Overlay:** The screen darkens, and a centered card appears.
    *   **Content:**
        *   **Title:** "Confirm Purchase" in **H3 (18pt, Semi-Bold)**.
        *   **Summary:** "You are sending ₦1,000 Airtime to 08012345678." in **Body (16pt, Regular)**.
        *   **Cost Breakdown:** A clear breakdown: "Total Cost: ~0.85 USDC" in **Body (16pt, Regular)**.
        *   **Button:** A full-width primary CTA button with the text "Confirm & Pay."

#### **2.4. Pay by Bank Transfer Flow**

*   **Screen 1 (Input):**
    *   **Header:** "Bank Transfer" in **H2 (24pt, Bold)**.
    *   **Form:**
        *   **Amount Field:** Standard input for "Amount (NGN)."
        *   **Bank Name Dropdown:** A dropdown/picker component for selecting a bank.
        *   **Account Number Field:** Standard input for "Account Number."
        *   **Account Name Verification:** This is the key UX element.
            *   Initially, this area is empty.
            *   While the user types the account number and the API call is pending, a small, white loading spinner appears next to the field.
            *   On successful API response, the spinner is replaced by a **green (`#2ECC71`) checkmark icon** and the verified account name ("Mama J's Kitchen") is displayed in **Body (16pt, Bold)** green text.
    *   **Button:** A full-width primary CTA button with the text "Proceed." It remains in a **disabled state (`#5A6470`)** until the account name has been successfully verified.

*   **Screen 2 (Confirmation Modal):**
    *   Identical structure to the Airtime confirmation modal.
    *   **Summary:** "You are sending ₦12,500 to Mama J's Kitchen."
    *   **Cost Breakdown:** "Total Cost: ~10.60 USDC."
    *   **Button:** "Confirm & Pay."

#### **2.5. Generic Success Screen**

*   **Layout:** Vertically centered, celebratory.
*   **Background:** Solid deep blue (`#0D1B2A`).
*   **Elements:**
    1.  **Icon (Top):** A very large checkmark icon inside a circle, rendered in the success green (`#2ECC71`).
    2.  **Title (Center):** "Success!" in **H1 (32pt, Bold)** white text.
    3.  **Details (Below Title):** A summary of the completed transaction, e.g., "You successfully purchased your ₦1,000 electricity token!" in **Body (16pt, Regular)** white text, centered.
    4.  **Button (Bottom):** A full-width primary CTA button with the text "Done," which navigates the user back to the Home Screen.