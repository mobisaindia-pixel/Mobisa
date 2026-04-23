"use client";

import React from "react";
import PageLoader from "./components/PageLoader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScatteredText from "./components/ScatteredText";
import AgencySection from "./components/AgencySection";
import ShowcaseSection from "./components/ShowcaseSection";
import ServicesSection from "./components/ServicesSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <PageLoader />
      <Navbar />
      <main>
        <Hero />
        <ScatteredText />
        <AgencySection />
        <ShowcaseSection />
        <ServicesSection />

      </main>
      <Footer />
    </>
  );
}
