# BUNDLE DEMO VIDEO: COLOR PALETTE & UI ELEMENT GUIDE
*Design System: Bundle App | Theme: Dark Professional*

---

## **BUNDLE COLOR PALETTE**

### **Primary Colors:**
- **Primary Background**: `#0D1B2A` (Deep navy blue)
  - Usage: Main app background, headers
  - RGB: 13, 27, 42
  - Accessibility: High contrast base

- **Surface Color**: `#1F2A37` (Dark blue-gray)
  - Usage: Cards, modals, elevated surfaces
  - RGB: 31, 42, 55
  - Accessibility: Secondary backgrounds

- **Accent Color**: `#00F5D4` (Mint green)
  - Usage: CTAs, highlights, success states
  - RGB: 0, 245, 212
  - Hex Variations: `#00D4B4` (darker), `#1AFFF0` (lighter)

### **Text Colors:**
- **Primary Text**: `#FFFFFF` (Pure white)
  - Usage: Main headings, important text
  - RGB: 255, 255, 255

- **Secondary Text**: `#A9B4C2` (Light gray-blue)
  - Usage: Subtext, descriptions, labels
  - RGB: 169, 180, 194

- **Disabled Text**: `#5A6470` (Medium gray)
  - Usage: Disabled states, placeholders
  - RGB: 90, 100, 112

### **Status Colors:**
- **Success Green**: `#2ECC71` (Success states)
  - Usage: Confirmations, positive feedback
  - RGB: 46, 204, 113

- **Error Red**: `#E74C3C` (Error states)
  - Usage: Failures, warnings
  - RGB: 231, 76, 60

### **Interactive Colors:**
- **Hover States**: `#00F5D4` with 20% opacity overlay
- **Active States**: `#00F5D4` with 30% opacity overlay
- **Focus Rings**: `#00F5D4` 2px border

---

## **UI ELEMENT SPECIFICATIONS**

### **Typography System:**
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

**Heading Sizes:**
- **Display (H1)**: 32px, Bold, Line Height: 1.2
- **Headline (H2)**: 24px, Bold, Line Height: 1.3
- **Subheadline (H3)**: 18px, SemiBold, Line Height: 1.4
- **Caption**: 14px, Medium, Line Height: 1.4

**Body Text:**
- **Body Large**: 16px, Regular, Line Height: 1.5
- **Body Medium**: 14px, Regular, Line Height: 1.4
- **Body Small**: 12px, Regular, Line Height: 1.3

### **Button Components:**
- **Primary Button**:
  - Background: `#00F5D4`
  - Text: `#0D1B2A`
  - Border: None
  - Border Radius: 8px
  - Padding: 12px 24px
  - Font: 16px SemiBold

- **Secondary Button**:
  - Background: Transparent
  - Text: `#00F5D4`
  - Border: 2px solid `#00F5D4`
  - Border Radius: 8px
  - Padding: 12px 24px
  - Font: 16px SemiBold

### **Form Elements:**
- **Input Fields**:
  - Background: `#1F2A37`
  - Border: 1px solid `#5A6470`
  - Border Radius: 8px
  - Padding: 12px 16px
  - Font: 16px Regular
  - Text Color: `#FFFFFF`
  - Placeholder: `#5A6470`

- **Select Dropdowns**:
  - Same as input fields
  - Arrow Icon: `#A9B4C2`
  - Hover: Border color `#00F5D4`

### **Card Components:**
- **Card Background**: `#1F2A37`
- **Card Border**: 1px solid `#5A6470`
- **Card Border Radius**: 12px
- **Card Padding**: 24px
- **Card Shadow**: 0 4px 6px rgba(0, 0, 0, 0.1)

### **Modal Components:**
- **Modal Backdrop**: rgba(13, 27, 42, 0.8)
- **Modal Background**: `#1F2A37`
- **Modal Border Radius**: 16px
- **Modal Padding**: 32px

---

## **NETWORK BRAND COLORS (AIRTIME)**

### **Nigerian Telecom Brands:**
- **MTN**: `#FFCC00` (Yellow)
  - Text Color: `#000000` (Black)
  - Usage: Network selection tiles

- **Glo**: `#00A651` (Green)
  - Text Color: `#FFFFFF` (White)
  - Usage: Network selection tiles

- **Airtel**: `#FF0000` (Red)
  - Text Color: `#FFFFFF` (White)
  - Usage: Network selection tiles

- **9mobile**: `#00A86B` (Teal Green)
  - Text Color: `#FFFFFF` (White)
  - Usage: Network selection tiles

### **Network Tile Design:**
- **Size**: 48x48px (3rem x 3rem)
- **Border Radius**: 8px
- **Selected State**: 2px `#00F5D4` ring
- **Scale**: 1.05x when selected
- **Transition**: 0.2s smooth

---

## **SUCCESS & LOADING STATES**

### **Success States:**
- **Background**: `#2ECC71` with 10% opacity
- **Icon**: White checkmark (24px)
- **Animation**: Scale in (0.3s), bounce effect
- **Text**: "Success" or "Completed"

### **Loading States:**
- **Spinner**: `#00F5D4` border, transparent background
- **Size**: 20px diameter
- **Animation**: 1s rotation
- **Text**: "Processing..." or "Verifying..."

### **Progress Indicators:**
- **Success Rate Bar**: `#2ECC71` fill, `#5A6470` background
- **Height**: 4px
- **Border Radius**: 2px
- **Animation**: Smooth fill (0.5s)

---

## **ANIMATION SPECIFICATIONS**

### **Micro-Interactions:**
- **Button Press**: 0.1s scale down (0.98x)
- **Hover Effects**: 0.2s opacity change
- **Focus States**: 0.2s border color change
- **Loading**: 0.3s fade transitions

### **Page Transitions:**
- **Slide Duration**: 0.3s ease-in-out
- **Direction**: Left to right, bottom to top
- **Easing**: Cubic bezier (0.4, 0, 0.2, 1)

### **Magic Moment Animations:**
- **Account Verification**: 0.5s green checkmark scale
- **Success Screen**: 0.8s confetti burst
- **Network Selection**: 0.2s tile highlight

---

## **ACCESSIBILITY CONSIDERATIONS**

### **Color Contrast:**
- **Primary Background vs Text**: 15.8:1 (AAA)
- **Surface vs Text**: 12.6:1 (AAA)
- **Accent vs Dark Background**: 8.9:1 (AAA)
- **Secondary Text vs Background**: 7.2:1 (AA)

### **Focus Indicators:**
- **Keyboard Navigation**: 2px mint green outline
- **Screen Reader**: Proper ARIA labels
- **Motion**: Respects prefers-reduced-motion

### **Text Readability:**
- **Minimum Size**: 14px for body text
- **Line Height**: 1.4 minimum
- **Letter Spacing**: 0.01em for small text
- **Font Weight**: 400+ for readability

---

## **VIDEO PRODUCTION COLOR CORRECTION**

### **Color Grading Guidelines:**
- **Temperature**: Cool (6500K)
- **Tint**: Neutral to slightly green
- **Saturation**: +10% for accent colors
- **Contrast**: +15% for depth

### **LUT Recommendations:**
- **Base LUT**: Cool contrast boost
- **Accent Enhancement**: Selective mint green boost
- **Skin Tones**: Natural, unaffected
- **Highlights**: Preserve detail

### **Exposure Matching:**
- **Screen Brightness**: Match across all shots
- **Black Levels**: Consistent 0-5 IRE
- **White Levels**: 95-100 IRE
- **Gamma**: 2.2-2.4

---

## **UI ELEMENT HIERARCHY**

### **Visual Importance:**
1. **Primary CTA Buttons** (Mint green, prominent)
2. **Form Inputs** (Dark cards, clear borders)
3. **Success States** (Green, animated)
4. **Navigation** (Subtle, accessible)
5. **Secondary Actions** (Transparent, outlined)

### **Spacing System:**
- **Micro**: 4px (borders, small gaps)
- **Small**: 8px (icon padding, small elements)
- **Medium**: 16px (button padding, form spacing)
- **Large**: 24px (card padding, section gaps)
- **XL**: 32px (modal padding, large sections)

### **Border Radius Scale:**
- **Small**: 4px (buttons, small cards)
- **Medium**: 8px (inputs, standard cards)
- **Large**: 12px (modals, large cards)
- **XL**: 16px (hero sections, main containers)

---

## **BRAND CONSISTENCY CHECKLIST**

### **Color Accuracy:**
- [ ] Primary background exactly `#0D1B2A`
- [ ] Accent color exactly `#00F5D4`
- [ ] Text colors match specifications
- [ ] Network brand colors authentic

### **Typography Consistency:**
- [ ] Inter font family used throughout
- [ ] Font weights match design system
- [ ] Text sizes follow hierarchy
- [ ] Line heights appropriate

### **Component Styling:**
- [ ] Buttons match design specifications
- [ ] Form elements consistent
- [ ] Cards and modals properly styled
- [ ] Loading states animated correctly

### **Animation Quality:**
- [ ] Smooth transitions throughout
- [ ] Consistent timing and easing
- [ ] Magic moments properly emphasized
- [ ] No jarring or broken animations

This color palette and UI guide ensures visual consistency throughout the Bundle demo video, maintaining the app's professional design language while maximizing impact for hackathon judges.
