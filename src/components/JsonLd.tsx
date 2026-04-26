export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "LAV PHARMA",
    alternateName: "LavPharma Regulatory Services",
    url: "https://lavpharma.com",
    logo: "https://lavpharma.com/logo.svg",
    description:
      "Regulatory pharmaceutical and veterinary services specializing in sanitary registrations, dossier compilation, and regulatory compliance across Latin America.",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Hacienda San Andrés, Carretera a San Juan Opico, km 32½ Sitio el niño",
      addressCountry: "SV",
    },
    telephone: "+503-7238-4539",
    email: "info@lavpharma.com",
    areaServed: [
      { "@type": "Country", name: "Guatemala" },
      { "@type": "Country", name: "El Salvador" },
      { "@type": "Country", name: "Honduras" },
      { "@type": "Country", name: "Costa Rica" },
      { "@type": "Country", name: "Panama" },
      { "@type": "Country", name: "Paraguay" },
      { "@type": "Country", name: "Uruguay" },
      { "@type": "Country", name: "Ecuador" },
      { "@type": "Country", name: "Bolivia" },
    ],
    serviceType: [
      "Pharmaceutical Registration",
      "Veterinary Product Registration",
      "Sanitary Registration",
      "Regulatory Affairs",
      "Regulatory Compliance",
      "Import Permits",
      "Regulatory Holding",
      "Dossier Compilation",
    ],
    knowsLanguage: ["en", "es"],
    foundingDate: "2016",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 50,
    },
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
