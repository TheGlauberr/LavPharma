import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import International from "@/components/International";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <Services />
      <International />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
