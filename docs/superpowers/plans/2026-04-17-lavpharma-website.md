# LAV PHARMA Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (ES/EN) single-page website for LAV PHARMA using Next.js, Tailwind CSS, and next-intl, deployed to Vercel.

**Architecture:** Next.js App Router with `[locale]` dynamic segment for i18n. All content lives in JSON translation files. Static generation (SSG) for performance. Single page with section components. Formspree for contact form submission.

**Tech Stack:** Next.js 15+, Tailwind CSS 4, TypeScript, next-intl, Lucide React, Formspree

---

## File Structure

```
lavpharma/
├── public/
│   ├── logo.svg              # Dark logo for light backgrounds
│   └── logo-alt.svg          # Light logo for dark backgrounds
├── messages/
│   ├── es.json               # Spanish translations
│   └── en.json               # English translations
├── src/
│   ├── i18n/
│   │   ├── routing.ts        # next-intl routing config
│   │   ├── request.ts        # next-intl request config
│   │   └── navigation.ts     # locale-aware Link, useRouter
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx    # Root layout with fonts, metadata, locale
│   │   │   └── page.tsx      # Single page assembling all sections
│   │   ├── layout.tsx        # Top-level HTML shell
│   │   └── not-found.tsx     # 404 page
│   ├── components/
│   │   ├── Navbar.tsx        # Sticky nav with scroll effect + mobile menu
│   │   ├── Hero.tsx          # Dark hero with molecular bg + stats
│   │   ├── Services.tsx      # 5 service cards grid
│   │   ├── International.tsx # Global presence with region cards
│   │   ├── About.tsx         # Mission, vision, values
│   │   ├── Contact.tsx       # Form + contact info (dark bg)
│   │   ├── Footer.tsx        # Minimal footer
│   │   ├── WhatsAppButton.tsx # Floating WhatsApp FAB
│   │   ├── LanguageToggle.tsx # ES/EN pill toggle
│   │   └── MolecularBg.tsx   # SVG molecular pattern component
│   └── middleware.ts         # next-intl middleware for locale detection
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .gitignore
```

---

### Task 1: Project Scaffold + i18n Setup

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`
- Create: `src/i18n/routing.ts`, `src/i18n/request.ts`, `src/i18n/navigation.ts`
- Create: `src/middleware.ts`
- Create: `src/app/layout.tsx`, `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`
- Create: `messages/es.json`, `messages/en.json`
- Create: `public/logo.svg`, `public/logo-alt.svg`
- Modify: `.gitignore`

- [ ] **Step 1: Create Next.js project**

```bash
cd /Users/luisvidal/Desktop/LavPharma
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --yes
```

- [ ] **Step 2: Install dependencies**

```bash
npm install next-intl lucide-react
```

- [ ] **Step 3: Copy logo files into public/**

```bash
cp "/Users/luisvidal/Downloads/Logo.svg" public/logo.svg
cp "/Users/luisvidal/Downloads/Logo Alt.svg" public/logo-alt.svg
```

- [ ] **Step 4: Configure next-intl plugin in next.config.ts**

```typescript
// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
```

- [ ] **Step 5: Create i18n routing config**

```typescript
// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
});
```

- [ ] **Step 6: Create i18n request config**

```typescript
// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 7: Create navigation helpers**

```typescript
// src/i18n/navigation.ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
```

- [ ] **Step 8: Create middleware**

```typescript
// src/middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
```

- [ ] **Step 9: Create translation files**

```json
// messages/es.json
{
  "Metadata": {
    "title": "LAV PHARMA | Servicios Regulatorios Farmacéuticos",
    "description": "Expertos en registros sanitarios, permisos de distribución y asuntos regulatorios internacionales para el sector salud."
  },
  "Nav": {
    "services": "Servicios",
    "about": "Nosotros",
    "contact": "Contacto"
  },
  "Hero": {
    "label": "REGULATORY PHARMACEUTICAL SERVICES",
    "title": "Llevamos tus productos al mercado global",
    "subtitle": "Expertos en registros sanitarios y asuntos regulatorios. Tu aliado estratégico para el sector salud.",
    "cta": "Contáctanos",
    "whatsapp": "WhatsApp",
    "stats": {
      "countries": "Países",
      "registrations": "Registros",
      "commitment": "Compromiso"
    }
  },
  "Services": {
    "title": "Nuestros Servicios",
    "subtitle": "Soluciones regulatorias integrales para el sector salud",
    "items": {
      "registros": {
        "title": "Registros Sanitarios",
        "description": "Gestión e inscripción de permisos para medicamentos, productos cosméticos y productos de salud ante las autoridades sanitarias."
      },
      "distribucion": {
        "title": "Distribución de Medicamentos",
        "description": "Obtención de permisos y licencias necesarias para la distribución legal de medicamentos en diferentes mercados."
      },
      "asesoria": {
        "title": "Asesoría Regulatoria Internacional",
        "description": "Consultoría especializada para facilitar la expansión de productos de salud a mercados internacionales."
      },
      "cumplimiento": {
        "title": "Cumplimiento Normativo",
        "description": "Acompañamiento continuo para garantizar el cumplimiento de normativas sanitarias y legales vigentes."
      },
      "permisos": {
        "title": "Gestión de Permisos",
        "description": "Tramitación y seguimiento de permisos, licencias y autorizaciones del sector salud de forma ágil y eficiente."
      }
    }
  },
  "International": {
    "title": "Presencia Internacional",
    "subtitle": "Operamos con visión global, ofreciendo soluciones regulatorias en múltiples regiones del mundo.",
    "regions": {
      "centralAmerica": "Centro América",
      "southAmerica": "Sudamérica",
      "asia": "Asia",
      "europe": "Europa"
    }
  },
  "About": {
    "title": "Sobre Nosotros",
    "mission": {
      "title": "Misión",
      "text": "Brindar servicios especializados en la gestión, inscripción y obtención de permisos para la distribución de medicamentos, productos cosméticos y productos de salud, garantizando el cumplimiento de las normativas sanitarias vigentes."
    },
    "vision": {
      "title": "Visión",
      "text": "Ser una empresa líder en servicios regulatorios y sanitarios, reconocida por nuestra eficiencia, experiencia y compromiso con la calidad, convirtiéndonos en el aliado estratégico preferido para empresas del sector salud nacionales e internacionales."
    },
    "valuesTitle": "Nuestros Valores",
    "values": {
      "integrity": { "title": "Integridad", "description": "Actuamos con honestidad, transparencia y ética en cada proceso." },
      "responsibility": { "title": "Responsabilidad", "description": "Cumplimos rigurosamente con las normativas sanitarias y legales." },
      "efficiency": { "title": "Eficiencia", "description": "Optimizamos procesos para ofrecer soluciones ágiles y oportunas." },
      "quality": { "title": "Compromiso con la Calidad", "description": "Buscamos la excelencia en cada servicio, asegurando precisión." },
      "confidentiality": { "title": "Confidencialidad", "description": "Protegemos la información de nuestros clientes con total discreción." },
      "clientFocus": { "title": "Orientación al Cliente", "description": "Escuchamos y damos soluciones personalizadas a cada necesidad." },
      "innovation": { "title": "Innovación", "description": "Mejoramos continuamente para adaptarnos al entorno regulatorio." }
    }
  },
  "Contact": {
    "title": "Contáctanos",
    "subtitle": "Estamos listos para ayudarte con tus necesidades regulatorias.",
    "form": {
      "name": "Nombre",
      "email": "Correo Electrónico",
      "phone": "Teléfono",
      "company": "Empresa",
      "message": "Mensaje",
      "submit": "Enviar Mensaje",
      "success": "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.",
      "error": "Hubo un error al enviar el mensaje. Por favor intenta de nuevo."
    },
    "info": {
      "title": "Información de Contacto",
      "email": "Correo Electrónico",
      "phone": "Teléfonos",
      "location": "Ubicación",
      "address": "Hacienda San Andrés, Carretera a San Juan Opico, km 32½ Sitio el niño"
    }
  },
  "Footer": {
    "rights": "Todos los derechos reservados.",
    "tagline": "Regulatory Pharmaceutical Services"
  }
}
```

```json
// messages/en.json
{
  "Metadata": {
    "title": "LAV PHARMA | Regulatory Pharmaceutical Services",
    "description": "Experts in health registrations, distribution permits, and international regulatory affairs for the healthcare sector."
  },
  "Nav": {
    "services": "Services",
    "about": "About Us",
    "contact": "Contact"
  },
  "Hero": {
    "label": "REGULATORY PHARMACEUTICAL SERVICES",
    "title": "We bring your products to the global market",
    "subtitle": "Experts in health registrations and regulatory affairs. Your strategic partner for the healthcare sector.",
    "cta": "Contact Us",
    "whatsapp": "WhatsApp",
    "stats": {
      "countries": "Countries",
      "registrations": "Registrations",
      "commitment": "Commitment"
    }
  },
  "Services": {
    "title": "Our Services",
    "subtitle": "Comprehensive regulatory solutions for the healthcare sector",
    "items": {
      "registros": {
        "title": "Health Registrations",
        "description": "Management and registration of permits for medications, cosmetic products, and health products with health authorities."
      },
      "distribucion": {
        "title": "Drug Distribution",
        "description": "Obtaining permits and licenses required for the legal distribution of medications in different markets."
      },
      "asesoria": {
        "title": "International Regulatory Consulting",
        "description": "Specialized consulting to facilitate the expansion of health products into international markets."
      },
      "cumplimiento": {
        "title": "Regulatory Compliance",
        "description": "Ongoing support to ensure compliance with current health and legal regulations."
      },
      "permisos": {
        "title": "Permit Management",
        "description": "Processing and tracking of permits, licenses, and health sector authorizations efficiently."
      }
    }
  },
  "International": {
    "title": "International Presence",
    "subtitle": "We operate with a global vision, offering regulatory solutions across multiple regions worldwide.",
    "regions": {
      "centralAmerica": "Central America",
      "southAmerica": "South America",
      "asia": "Asia",
      "europe": "Europe"
    }
  },
  "About": {
    "title": "About Us",
    "mission": {
      "title": "Mission",
      "text": "To provide specialized services in the management, registration, and obtaining of permits for the distribution of medications, cosmetic products, and health products, ensuring compliance with current health regulations."
    },
    "vision": {
      "title": "Vision",
      "text": "To be a leading company in regulatory and health services, recognized for our efficiency, experience, and commitment to quality, becoming the preferred strategic partner for national and international healthcare companies."
    },
    "valuesTitle": "Our Values",
    "values": {
      "integrity": { "title": "Integrity", "description": "We act with honesty, transparency, and ethics in every process." },
      "responsibility": { "title": "Responsibility", "description": "We rigorously comply with health and legal regulations." },
      "efficiency": { "title": "Efficiency", "description": "We optimize processes to deliver agile and timely solutions." },
      "quality": { "title": "Quality Commitment", "description": "We pursue excellence in every service, ensuring precision." },
      "confidentiality": { "title": "Confidentiality", "description": "We protect our clients' information with total discretion." },
      "clientFocus": { "title": "Client Focus", "description": "We listen and provide personalized solutions for every need." },
      "innovation": { "title": "Innovation", "description": "We continuously improve to adapt to the regulatory environment." }
    }
  },
  "Contact": {
    "title": "Contact Us",
    "subtitle": "We're ready to help with your regulatory needs.",
    "form": {
      "name": "Name",
      "email": "Email",
      "phone": "Phone",
      "company": "Company",
      "message": "Message",
      "submit": "Send Message",
      "success": "Message sent successfully! We'll get back to you soon.",
      "error": "There was an error sending the message. Please try again."
    },
    "info": {
      "title": "Contact Information",
      "email": "Email",
      "phone": "Phone",
      "location": "Location",
      "address": "Hacienda San Andrés, Carretera a San Juan Opico, km 32½ Sitio el niño"
    }
  },
  "Footer": {
    "rights": "All rights reserved.",
    "tagline": "Regulatory Pharmaceutical Services"
  }
}
```

- [ ] **Step 10: Create root layout (HTML shell)**

```tsx
// src/app/layout.tsx
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
```

- [ ] **Step 11: Create locale layout**

```tsx
// src/app/[locale]/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: "https://lavpharma.com",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 12: Create placeholder page**

```tsx
// src/app/[locale]/page.tsx
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("Hero");

  return (
    <main>
      <h1>{t("title")}</h1>
    </main>
  );
}
```

- [ ] **Step 13: Run dev server to verify**

```bash
npm run dev
```

Expected: App runs at localhost:3000, shows hero title in Spanish. Visiting `/en` shows English.

- [ ] **Step 14: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with next-intl i18n setup

Configures App Router with [locale] routing, ES/EN translations,
middleware for browser language detection, and Inter font."
```

---

### Task 2: Tailwind Design System + MolecularBg

**Files:**
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.ts`
- Create: `src/components/MolecularBg.tsx`

- [ ] **Step 1: Configure Tailwind with custom colors**

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#3D4456",
          dark: "#2a2f3d",
          darker: "#1a1f2e",
        },
        accent: {
          blue: "#4A90D9",
          "blue-hover": "#357abd",
        },
        muted: "#6b7280",
        "card-border": "#dce5f4",
        "card-bg": "#f0f4ff",
        "card-bg-alt": "#e8f0fe",
        whatsapp: "#25D366",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Set up global CSS**

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --color-navy: #3D4456;
  --color-navy-dark: #2a2f3d;
  --color-navy-darker: #1a1f2e;
  --color-accent-blue: #4A90D9;
  --color-accent-blue-hover: #357abd;
  --color-muted: #6b7280;
  --color-card-border: #dce5f4;
  --color-card-bg: #f0f4ff;
  --color-card-bg-alt: #e8f0fe;
  --color-whatsapp: #25D366;
}
```

- [ ] **Step 3: Create MolecularBg component**

```tsx
// src/components/MolecularBg.tsx
export default function MolecularBg({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Nodes */}
      <circle cx="80" cy="60" r="6" fill="currentColor" opacity="0.15" />
      <circle cx="200" cy="40" r="4" fill="currentColor" opacity="0.1" />
      <circle cx="140" cy="130" r="8" fill="currentColor" opacity="0.12" />
      <circle cx="300" cy="80" r="5" fill="currentColor" opacity="0.1" />
      <circle cx="260" cy="180" r="6" fill="currentColor" opacity="0.15" />
      <circle cx="350" cy="50" r="3" fill="currentColor" opacity="0.08" />
      <circle cx="50" cy="200" r="4" fill="currentColor" opacity="0.1" />
      <circle cx="180" cy="240" r="7" fill="currentColor" opacity="0.12" />
      <circle cx="340" cy="220" r="5" fill="currentColor" opacity="0.1" />
      {/* Bonds */}
      <line x1="80" y1="60" x2="200" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.08" />
      <line x1="200" y1="40" x2="140" y2="130" stroke="currentColor" strokeWidth="1" opacity="0.08" />
      <line x1="140" y1="130" x2="300" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.06" />
      <line x1="300" y1="80" x2="260" y2="180" stroke="currentColor" strokeWidth="1" opacity="0.08" />
      <line x1="300" y1="80" x2="350" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.06" />
      <line x1="80" y1="60" x2="50" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.06" />
      <line x1="140" y1="130" x2="180" y2="240" stroke="currentColor" strokeWidth="1" opacity="0.08" />
      <line x1="260" y1="180" x2="340" y2="220" stroke="currentColor" strokeWidth="1" opacity="0.06" />
    </svg>
  );
}
```

- [ ] **Step 4: Verify dev server still works**

```bash
npm run dev
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Tailwind design system colors and MolecularBg component"
```

---

### Task 3: Navbar + LanguageToggle

**Files:**
- Create: `src/components/Navbar.tsx`
- Create: `src/components/LanguageToggle.tsx`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Create LanguageToggle**

```tsx
// src/components/LanguageToggle.tsx
"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale() {
    const next = locale === "es" ? "en" : "es";
    router.replace(pathname, { locale: next });
  }

  return (
    <button
      onClick={switchLocale}
      className="text-sm font-medium px-3 py-1 rounded-full border border-accent-blue/40 text-accent-blue hover:bg-accent-blue/10 transition-colors"
      aria-label={locale === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      {locale === "es" ? "EN" : "ES"}
    </button>
  );
}
```

- [ ] **Step 2: Create Navbar**

```tsx
// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#servicios", label: t("services") },
    { href: "#nosotros", label: t("about") },
    { href: "#contacto", label: t("contact") },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <img
              src={scrolled ? "/logo.svg" : "/logo-alt.svg"}
              alt="LAV PHARMA"
              className="h-8 w-auto"
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-navy hover:text-accent-blue"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <LanguageToggle />
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 ${scrolled ? "text-navy" : "text-white"}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-navy font-medium text-base hover:text-accent-blue"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 3: Add Navbar to locale layout**

Update `src/app/[locale]/layout.tsx` — add `import Navbar from "@/components/Navbar";` and place `<Navbar />` at the top of the body, before `{children}`.

```tsx
// In the return of LocaleLayout, update the body:
<body className={`${inter.className} antialiased`}>
  <Navbar />
  {children}
</body>
```

- [ ] **Step 4: Verify nav works in browser**

```bash
npm run dev
```

Expected: Sticky navbar is transparent on hero, turns white on scroll. Language toggle switches between ES/EN. Mobile hamburger opens drawer.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add sticky Navbar with scroll effect and language toggle"
```

---

### Task 4: Hero Section

**Files:**
- Create: `src/components/Hero.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create Hero component**

```tsx
// src/components/Hero.tsx
"use client";

import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import MolecularBg from "./MolecularBg";

const WHATSAPP_NUMBER = "5037238453";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola, me gustaría obtener más información sobre sus servicios regulatorios."
)}`;

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative bg-navy min-h-screen flex items-center overflow-hidden">
      {/* Molecular background */}
      <MolecularBg className="absolute top-0 right-0 w-[600px] h-[450px] text-accent-blue pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="max-w-2xl">
          <p className="text-accent-blue text-xs tracking-[3px] uppercase font-semibold mb-4">
            {t("label")}
          </p>
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            {t("title")}
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
            {t("subtitle")}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contacto"
              className="bg-accent-blue hover:bg-accent-blue-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {t("cta")}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-whatsapp text-whatsapp hover:bg-whatsapp/10 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
            >
              <MessageCircle size={18} />
              {t("whatsapp")}
            </a>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-navy-dark border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-center gap-12 sm:gap-24">
          <div className="text-center">
            <div className="text-accent-blue text-3xl font-extrabold">15+</div>
            <div className="text-gray-400 text-sm mt-1">{t("stats.countries")}</div>
          </div>
          <div className="text-center">
            <div className="text-accent-blue text-3xl font-extrabold">500+</div>
            <div className="text-gray-400 text-sm mt-1">{t("stats.registrations")}</div>
          </div>
          <div className="text-center">
            <div className="text-accent-blue text-3xl font-extrabold">100%</div>
            <div className="text-gray-400 text-sm mt-1">{t("stats.commitment")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update page to use Hero**

```tsx
// src/app/[locale]/page.tsx
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 3: Verify hero renders correctly**

```bash
npm run dev
```

Expected: Full-screen dark hero with molecular background, headline, CTAs, stats bar. WhatsApp button opens WhatsApp. Language toggle changes text.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Hero section with molecular background, CTAs, and stats bar"
```

---

### Task 5: Services Section

**Files:**
- Create: `src/components/Services.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create Services component**

```tsx
// src/components/Services.tsx
"use client";

import { useTranslations } from "next-intl";
import {
  ClipboardCheck,
  Truck,
  Globe,
  ShieldCheck,
  FileText,
} from "lucide-react";

const SERVICE_KEYS = [
  { key: "registros", icon: ClipboardCheck },
  { key: "distribucion", icon: Truck },
  { key: "asesoria", icon: Globe },
  { key: "cumplimiento", icon: ShieldCheck },
  { key: "permisos", icon: FileText },
] as const;

export default function Services() {
  const t = useTranslations("Services");

  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-navy text-3xl sm:text-4xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_KEYS.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="bg-gradient-to-br from-card-bg to-card-bg-alt border border-card-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-accent-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Icon className="text-accent-blue" size={24} />
              </div>
              <h3 className="text-navy font-bold text-lg mb-2">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {t(`items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Services to page**

```tsx
// src/app/[locale]/page.tsx
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <Services />
    </main>
  );
}
```

- [ ] **Step 3: Verify services section**

```bash
npm run dev
```

Expected: 5 service cards in a grid (3+2 on desktop, 1 col on mobile). Blue gradient backgrounds, icons, hover shadows.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Services section with 5 service cards"
```

---

### Task 6: International Presence Section

**Files:**
- Create: `src/components/International.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create International component**

```tsx
// src/components/International.tsx
"use client";

import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";

const REGIONS = [
  { key: "centralAmerica", emoji: "🌎", countries: ["Guatemala", "El Salvador", "Honduras", "Costa Rica", "Panamá"] },
  { key: "southAmerica", emoji: "🌎", countries: ["Colombia", "Ecuador", "Perú"] },
  { key: "asia", emoji: "🌏", countries: ["India", "China"] },
  { key: "europe", emoji: "🌍", countries: ["España"] },
] as const;

export default function International() {
  const t = useTranslations("International");

  return (
    <section className="py-20 bg-card-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-navy text-3xl sm:text-4xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REGIONS.map(({ key, emoji, countries }) => (
            <div
              key={key}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{emoji}</div>
              <h3 className="text-navy font-bold text-lg mb-3">
                {t(`regions.${key}`)}
              </h3>
              <ul className="space-y-1.5">
                {countries.map((country) => (
                  <li
                    key={country}
                    className="text-muted text-sm flex items-center gap-2"
                  >
                    <MapPin size={14} className="text-accent-blue flex-shrink-0" />
                    {country}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add International to page**

Add `import International from "@/components/International";` and `<International />` after `<Services />` in `src/app/[locale]/page.tsx`.

- [ ] **Step 3: Verify and commit**

```bash
npm run dev
```

Expected: 4 region cards on light background with country lists.

```bash
git add -A
git commit -m "feat: add International Presence section with region cards"
```

---

### Task 7: About Section (Mission, Vision, Values)

**Files:**
- Create: `src/components/About.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create About component**

```tsx
// src/components/About.tsx
"use client";

import { useTranslations } from "next-intl";
import {
  Shield,
  CheckCircle,
  Zap,
  Award,
  Lock,
  Users,
  Lightbulb,
} from "lucide-react";

const VALUE_KEYS = [
  { key: "integrity", icon: Shield },
  { key: "responsibility", icon: CheckCircle },
  { key: "efficiency", icon: Zap },
  { key: "quality", icon: Award },
  { key: "confidentiality", icon: Lock },
  { key: "clientFocus", icon: Users },
  { key: "innovation", icon: Lightbulb },
] as const;

export default function About() {
  const t = useTranslations("About");

  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-navy text-3xl sm:text-4xl font-bold text-center mb-16">
          {t("title")}
        </h2>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-card-bg rounded-xl p-8 border border-card-border">
            <h3 className="text-accent-blue font-bold text-xl mb-4">
              {t("mission.title")}
            </h3>
            <p className="text-muted leading-relaxed">{t("mission.text")}</p>
          </div>
          <div className="bg-card-bg rounded-xl p-8 border border-card-border">
            <h3 className="text-accent-blue font-bold text-xl mb-4">
              {t("vision.title")}
            </h3>
            <p className="text-muted leading-relaxed">{t("vision.text")}</p>
          </div>
        </div>

        {/* Values */}
        <h3 className="text-navy text-2xl font-bold text-center mb-10">
          {t("valuesTitle")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUE_KEYS.map(({ key, icon: Icon }) => (
            <div key={key} className="text-center p-6">
              <div className="w-12 h-12 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="text-accent-blue" size={22} />
              </div>
              <h4 className="text-navy font-bold mb-2">
                {t(`values.${key}.title`)}
              </h4>
              <p className="text-muted text-sm">
                {t(`values.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add About to page**

Add `import About from "@/components/About";` and `<About />` after `<International />` in `src/app/[locale]/page.tsx`.

- [ ] **Step 3: Verify and commit**

```bash
npm run dev
```

Expected: Mission/Vision side by side, 7 value cards in a grid.

```bash
git add -A
git commit -m "feat: add About section with mission, vision, and values"
```

---

### Task 8: Contact Section + Form

**Files:**
- Create: `src/components/Contact.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create Contact component**

```tsx
// src/components/Contact.tsx
"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5037238453";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export default function Contact() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contacto" className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-white text-3xl sm:text-4xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-400 text-lg">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              required
              placeholder={t("form.name")}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue transition-colors"
            />
            <input
              type="email"
              name="email"
              required
              placeholder={t("form.email")}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue transition-colors"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="tel"
                name="phone"
                placeholder={t("form.phone")}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue transition-colors"
              />
              <input
                type="text"
                name="company"
                placeholder={t("form.company")}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue transition-colors"
              />
            </div>
            <textarea
              name="message"
              required
              rows={5}
              placeholder={t("form.message")}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-accent-blue hover:bg-accent-blue-hover disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              {status === "sending" ? "..." : t("form.submit")}
            </button>

            {status === "success" && (
              <p className="text-green-400 text-sm text-center">{t("form.success")}</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm text-center">{t("form.error")}</p>
            )}
          </form>

          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-white text-xl font-bold">{t("info.title")}</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="text-accent-blue mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-gray-400 text-sm mb-1">{t("info.email")}</p>
                  <a href="mailto:lavpharmacam@gmail.com" className="text-white hover:text-accent-blue transition-colors block">
                    lavpharmacam@gmail.com
                  </a>
                  <a href="mailto:administracionlavpharma@gmail.com" className="text-white hover:text-accent-blue transition-colors block">
                    administracionlavpharma@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-accent-blue mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-gray-400 text-sm mb-1">{t("info.phone")}</p>
                  <a href="tel:+50372384539" className="text-white hover:text-accent-blue transition-colors block">
                    +503 7238 4539
                  </a>
                  <a href="tel:+50231859189" className="text-white hover:text-accent-blue transition-colors block">
                    +502 3185 9189
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="text-accent-blue mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-gray-400 text-sm mb-1">{t("info.location")}</p>
                  <p className="text-white">{t("info.address")}</p>
                </div>
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-whatsapp hover:bg-whatsapp/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Contact to page**

Add `import Contact from "@/components/Contact";` and `<Contact />` after `<About />` in `src/app/[locale]/page.tsx`.

- [ ] **Step 3: Verify and commit**

```bash
npm run dev
```

Expected: Dark contact section with form on left, contact info on right. Form shows success/error states.

Note: The Formspree endpoint `YOUR_FORM_ID` needs to be replaced with a real form ID from formspree.io. For now the form will show an error on submit, which is fine.

```bash
git add -A
git commit -m "feat: add Contact section with form and contact info"
```

---

### Task 9: Footer + WhatsApp FAB

**Files:**
- Create: `src/components/Footer.tsx`
- Create: `src/components/WhatsAppButton.tsx`
- Modify: `src/app/[locale]/layout.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create Footer**

```tsx
// src/components/Footer.tsx
"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-darker py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo-alt.svg" alt="LAV PHARMA" className="h-6 w-auto" />
            <span className="text-gray-500 text-sm">{t("tagline")}</span>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {year} LAV PHARMA. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Create floating WhatsApp button**

```tsx
// src/components/WhatsAppButton.tsx
"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5037238453";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola, me gustaría obtener más información sobre sus servicios regulatorios."
)}`;

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-whatsapp hover:bg-whatsapp/90 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
```

- [ ] **Step 3: Add Footer to page and WhatsAppButton to layout**

In `src/app/[locale]/page.tsx`, add `import Footer from "@/components/Footer";` and `<Footer />` after `<Contact />`.

In `src/app/[locale]/layout.tsx`, add `import WhatsAppButton from "@/components/WhatsAppButton";` and place `<WhatsAppButton />` after `{children}` in the body.

- [ ] **Step 4: Verify and commit**

```bash
npm run dev
```

Expected: Footer with logo, tagline, copyright. Floating green WhatsApp button bottom-right, always visible.

```bash
git add -A
git commit -m "feat: add Footer and floating WhatsApp button"
```

---

### Task 10: SEO + Final Polish + Build Verification

**Files:**
- Modify: `src/app/[locale]/layout.tsx`
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Add favicon and SEO enhancements to layout metadata**

Add to the `generateMetadata` function in `src/app/[locale]/layout.tsx`:

```typescript
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://lavpharma.com"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: "https://lavpharma.com",
      siteName: "LAV PHARMA",
    },
    twitter: {
      card: "summary",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
```

- [ ] **Step 2: Create not-found page**

```tsx
// src/app/not-found.tsx
export default function NotFound() {
  return (
    <html lang="es">
      <body className="bg-navy min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-6xl font-bold mb-4">404</h1>
          <p className="text-gray-400 text-lg mb-8">Página no encontrada / Page not found</p>
          <a
            href="/"
            className="bg-accent-blue hover:bg-accent-blue-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Volver al inicio / Go home
          </a>
        </div>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Expected: Build succeeds with no errors. All locale pages are statically generated.

- [ ] **Step 4: Test production build locally**

```bash
npm run start
```

Expected: Site runs at localhost:3000. All sections render, language toggle works, mobile menu works, WhatsApp links work.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add SEO metadata, 404 page, and verify production build"
```

---

### Task 11: Deploy to Vercel

**Files:** None (external setup)

- [ ] **Step 1: Initialize git remote (if not already)**

```bash
gh repo create lavpharma --private --source=. --push
```

Or if using an existing repo, push the current branch.

- [ ] **Step 2: Deploy to Vercel**

```bash
npx vercel --yes
```

Follow prompts. This creates a Vercel project and deploys.

- [ ] **Step 3: Connect custom domain**

In the Vercel dashboard (or via CLI):
```bash
npx vercel domains add lavpharma.com
```

Then update DNS in GoDaddy:
- Add a CNAME record: `www` → `cname.vercel-dns.com`
- Add an A record: `@` → `76.76.21.21`

- [ ] **Step 4: Verify deployment**

Visit `https://lavpharma.com` — site should load with SSL.

- [ ] **Step 5: Set up Formspree**

1. Go to formspree.io, create a free account
2. Create a new form, get the form ID
3. Replace `YOUR_FORM_ID` in `src/components/Contact.tsx` with the actual ID
4. Commit and push — Vercel auto-deploys

```bash
git add src/components/Contact.tsx
git commit -m "feat: connect contact form to Formspree"
git push
```
