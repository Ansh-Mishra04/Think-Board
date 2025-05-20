"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Footer from "./_components/Footer";
import Pricing from "./_components/Pricing";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";

export default function Home() {
  const {user} =  useKindeBrowserClient();

  return (
    <div className="min-h-screen bg-[#E5F4FF]">
      <Header/>
      <Hero />
      {/* <Pricing /> */}
      <Footer />
    </div>
  );
}
