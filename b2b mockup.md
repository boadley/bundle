Absolutely. Here is the detailed UI/UX design specification for the "Bundle for Business" web dashboard mockups. This design maintains the core brand identity while adapting to a professional, data-rich desktop environment.

### **Bundle for Business: Web Dashboard UI/UX Specification**

This specification details the design for the two B2B web dashboard screens. The aesthetic is clean, professional, and optimized for information density and operational efficiency.

---

### **1. Web Design System**

#### **1.1. Color Palette**

The palette is adapted for a desktop interface, using lighter tones for the main content area to reduce eye strain, while retaining the brand's core colors in key areas.

*   **Primary Navigation (`#0D1B2A`):** The deep blue is used for the main sidebar, grounding the layout with the brand's primary color.
*   **Content Background (`#F8F9FA`):** A very light, almost-white grey for the main content area. This provides a clean, neutral canvas for data and charts.
*   **Card/Widget Background (`#FFFFFF`):** Pure white is used for all cards, tables, and modals to make them "pop" against the light grey content background.
*   **Accent/CTA (`#00F5D4`):** The vibrant mint green is reserved for primary buttons and highlighting active data series in charts.
*   **Primary Text (`#212529`):** A dark, near-black for all body copy, titles, and data points to ensure excellent readability on light backgrounds.
*   **Secondary Text (`#6C757D`):** A standard medium grey for labels, helper text, and inactive elements.
*   **Borders/Dividers (`#E9ECEF`):** A light grey for table borders and subtle dividers between sections.

#### **1.2. Typography**

A clean, sans-serif font like **Inter** is used, with a clear hierarchy for desktop viewing.

*   **Page Title (28pt, Bold):** For the main title of each screen (e.g., "Dashboard," "Bulk Payments").
*   **Widget Title (20pt, Semi-Bold):** For the title of each card or chart (e.g., "Spend Over Time").
*   **KPI Number (36pt, Bold):** For the large, attention-grabbing numbers in the main analytics cards.
*   **Body / Table Text (14pt, Regular):** The standard size for all descriptive text and data within tables.
*   **Button Text (15pt, Bold):** For all button labels.

#### **1.3. Layout & Components**

*   **Main Layout:** A classic two-column dashboard.
    *   **Left Sidebar:** A fixed-width (approx. 250px) navigation bar with the dark blue (`#0D1B2A`) background. It contains the Bundle logo at the top, followed by a vertical list of navigation items (e.g., Dashboard, Payments, API & Settings, Logout). The active item is indicated by a small vertical bar of the accent green (`#00F5D4`) to its left.
    *   **Content Area:** The main, scrollable area on the right with the light grey (`#F8F9FA`) background.
*   **Cards (Widgets):** Have a white (`#FFFFFF`) background, a subtle box-shadow, and an 8px border-radius. They contain all charts, tables, and forms.
*   **Charts:** Use the accent green (`#00F5D4`) as the primary color for data visualization. Use shades of blue and grey for comparative data. Tooltips on hover provide specific data points.
*   **Tables:** Designed for clarity. Headers have a light grey background (`#E9ECEF`). Rows are separated by a light horizontal border.
*   **Buttons:**
    *   **Primary:** Solid accent green (`#00F5D4`) background with dark blue (`#0D1B2A`) text for strong contrast.
    *   **Secondary:** White background with a dark blue border and text. Used for actions like "Download Report."

---

### **2. Screen Specifications**

#### **2.1. Dashboard Analytics Screen**

*   **Layout:** A grid-based arrangement of data widgets.
*   **Header:**
    *   **Left:** Page Title "Dashboard" in **28pt, Bold**.
    *   **Right:** A prominent "API Status" indicator. This consists of a solid green circle (12px diameter) followed by the text "API Status: All Systems Operational" in **14pt, Regular** grey text.
*   **Elements (in the Content Area):**
    1.  **KPI Row (Top):** A row of three cards, each displaying a key performance indicator.
        *   **Card 1: Total Spend:** Title "Total Spend (30d)" in secondary grey text. Main display is a large KPI number (e.g., "₦1,250,000") in **36pt, Bold**.
        *   **Card 2: Total Transactions:** Similar structure, showing a number like "842".
        *   **Card 3: Avg. Transaction Cost:** Shows a value like "~0.95 USDC".
    2.  **Main Chart (Middle):** A large, wide card titled "Categorized Expenses" (**20pt, Semi-Bold**). It contains a bar chart where each bar represents a category (Airtime, Bills, Bank Transfers) and its height represents the total spend.
    3.  **Recent Transactions Table (Bottom):** A card titled "Recent Business Transactions." It contains a table with the following columns: "Transaction ID," "Recipient," "Amount," "Date," and "Status." The status column uses colored badges (e.g., green for "Complete," red for "Failed").

#### **2.2. Bulk Payments Screen**

*   **Layout:** A two-step workflow layout.
*   **Header:**
    *   **Left:** Page Title "Bulk Airtime Payments" in **28pt, Bold**.
*   **Elements (in the Content Area):**
    1.  **Upload Card (Top):** A clean card designed to guide the user's first action.
        *   **Instructional Text:** "Upload a list of recipients to get started."
        *   **Primary Button:** A large primary CTA button with an upload icon and the text "Upload CSV."
        *   **Helper Link:** Below the button, a link with the text "Download Sample CSV" in the accent green color.
    2.  **Payments Table (Bottom):** This section is initially empty. After a CSV is uploaded, it populates a large table that fills the rest of the screen.
        *   **Table Title:** "Pending Payments."
        *   **Table Columns:** "Employee Name," "Phone Number," "Amount (NGN)," and "Status."
        *   **Status Column:** Each row in the status column displays a text badge: "Pending" (grey), "Complete" (green), or "Failed" (red).
    3.  **Action Footer:** A sticky footer bar appears once the table is populated.
        *   **Left:** A summary of the upload (e.g., "Total: 152 payments, ₦228,000").
        *   **Right:** A primary CTA button with the text "Execute All Payments."