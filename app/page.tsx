"use client";

import React from "react";
import PageLoader from "./components/PageLoader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScatteredText from "./components/ScatteredText";
import AgencySection from "./components/AgencySection";
import ProjectsCarousel from "./components/ProjectsCarousel";
import TeamSection from "./components/TeamSection";
import ServicesSection from "./components/ServicesSection";
import ClientsSection from "./components/ClientsSection";
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
        <ProjectsCarousel />
        <TeamSection />
        <ServicesSection />
        <ClientsSection />
      </main>
      <Footer />
    </>
  );
}
