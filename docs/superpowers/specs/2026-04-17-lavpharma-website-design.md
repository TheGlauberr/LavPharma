# LAV PHARMA Website - Design Spec

## Overview

Professional bilingual (ES/EN) single-page website for LAV PHARMA, a regulatory affairs company specializing in health product registration and permits. The site serves as the company's primary digital presence to attract clients from Latin America, Asia, and Europe.

**Domain:** lavpharma.com (purchased on GoDaddy)
**Deployment:** Vercel (free tier)

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Vercel
- **Form handling:** Formspree (free tier, sends to email)
- **i18n:** next-intl for bilingual support (ES/EN)
- **Icons:** Lucide React (lightweight, tree-shakeable)

## Design System

### Colors
- **Primary dark:** `#3D4456` (navy/charcoal - from logo)
- **Primary light:** `#A4ABBD` (gray-blue - from logo alt)
- **Accent blue:** `#4A90D9` (action buttons, highlights)
- **WhatsApp green:** `#25D366` (WhatsApp CTA)
- **Background light:** `#ffffff` and `#f0f4ff` (section backgrounds)
- **Text dark:** `#3D4456`
- **Text muted:** `#6b7280`
- **Card border:** `#dce5f4`

### Typography
- **Font:** Inter (Google Fonts) - clean, professional, great for both EN/ES
- **Headings:** Bold/Extra-bold, navy
- **Body:** Regular, muted gray

### Visual Style: "Crisp Contrast"
- Dark navy hero section with molecular background pattern (SVG)
- Clean hard cut to white/light sections below
- Service cards with soft blue gradients and borders
- Stats bar in dark navy for visual rhythm
- Elevated card shadows for depth
- Molecular/hexagonal design elements echoing the logo

### Logo
- Two SVG variants provided:
  - `Logo.svg` - dark on transparent (for light backgrounds)
  - `Logo Alt.svg` - light on dark background (for hero/dark sections)

## Language Strategy

- **Auto-detect** browser language on first visit
- **Fallback:** Spanish (primary market)
- **Toggle:** Pill button in navbar (`ES | EN`)
- **Implementation:** next-intl with JSON translation files
- **URL structure:** `/es/` and `/en/` prefixes

## Page Structure (Single Page)

### 1. Navigation (sticky)
- Logo (left)
- Section links: Servicios, Nosotros, Contacto (center/right)
- Language toggle pill (right)
- Mobile: hamburger menu
- Background transitions from transparent (over hero) to white (on scroll)

### 2. Hero Section
- **Background:** Dark navy (`#3D4456`) with subtle molecular SVG pattern (low opacity)
- **Content:**
  - Small uppercase label: "REGULATORY PHARMACEUTICAL SERVICES"
  - Main headline: "Llevamos tus productos al mercado global" / "We bring your products to the global market"
  - Subtitle: Brief company value prop
  - Two CTA buttons:
    - Primary: "Contáctanos" (blue, scrolls to contact)
    - Secondary: "WhatsApp" (green outline, opens WhatsApp)
- **Stats bar** at bottom of hero (dark background):
  - 15+ Países/Countries
  - 500+ Registros/Registrations
  - 100% Compromiso/Commitment

### 3. Services Section
- **Background:** White
- **Layout:** Grid of 5 service cards (3+2 on desktop, 1 column on mobile)
- **Card design:** Soft blue gradient background (`#f0f4ff` → `#e8f0fe`), border, icon, title, short description
- **Services:**
  1. **Registros Sanitarios** - Registration/permits for medications, cosmetics, health products
  2. **Distribución de Medicamentos** - Permits for drug distribution
  3. **Asesoría Regulatoria Internacional** - International regulatory consulting
  4. **Cumplimiento Normativo** - Regulatory compliance and ongoing support
  5. **Gestión de Permisos** - General permit management and processing

### 4. International Presence Section
- **Background:** Light gray (`#f0f4ff`)
- **Content:** Section title + description about global coverage
- **Visual:** Stylized world map or region highlights showing coverage areas:
  - Central America
  - South America
  - Asia
  - Europe
- **Implementation:** SVG map with highlighted regions, or grid of region cards with country flags

### 5. About / Mission & Values Section
- **Background:** White
- **Layout:** Two subsections
- **Mission & Vision:** Side by side on desktop, stacked on mobile
- **Values:** Grid of 7 value cards (icon + title + short description):
  1. Integridad
  2. Responsabilidad
  3. Eficiencia
  4. Compromiso con la calidad
  5. Confidencialidad
  6. Orientación al cliente
  7. Innovación

### 6. Contact Section
- **Background:** Dark navy (`#3D4456`) - bookends with the hero
- **Layout:** Two columns on desktop (form left, info right)
- **Form fields:** Name, Email, Phone, Company, Message
- **Form submission:** Formspree (free, sends to lavpharmacam@gmail.com)
- **Contact info (right side):**
  - Email: lavpharmacam@gmail.com, administracionlavpharma@gmail.com
  - Phone: +503 7238 4539, +502 3185 9189
  - Location: Hacienda San Andrés, Carretera a San Juan Opico, km 32½ Sitio el niño
  - WhatsApp button (prominent)

### 7. Footer
- **Background:** Darker shade of navy
- **Content:** Logo, copyright, quick links, social links (if any)
- **Simple and minimal**

## Floating WhatsApp Button
- Fixed position, bottom-right corner
- Green circle with WhatsApp icon
- Opens WhatsApp chat with pre-filled message
- WhatsApp number: +503 7238 4539 (primary)
- Always visible on all screen sizes

## Responsive Design
- **Mobile-first** approach (many visitors will come from QR code scans)
- **Breakpoints:** Tailwind defaults (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- **Mobile nav:** Hamburger menu with slide-out drawer
- **Cards:** Stack to single column on mobile
- **Contact form:** Full width on mobile

## SEO
- Meta tags for both languages
- Open Graph tags for social sharing
- Semantic HTML (proper heading hierarchy, landmarks)
- Alt text on images
- Schema.org LocalBusiness markup

## Performance
- Static generation (SSG) - no server needed
- SVG logo inline (no image requests)
- Lazy load below-fold sections
- Google Fonts with `display: swap`

## Future Considerations (not in v1)
- @lavpharma.com email addresses (Google Workspace setup)
- QR code generation (simple, just points to lavpharma.com)
- Blog/news section for regulatory updates
- Client testimonials
- Analytics (Google Analytics or Plausible)
