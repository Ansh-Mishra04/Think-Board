"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Footer from "./_components/Footer";
import Documentation from "./_components/Documentation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";

export default function Home() {
  const {user} =  useKindeBrowserClient();
  // useEffect(() => {
  //   console.log(user);
    
  // },[user])
  return (
    <div className="min-h-screen bg-[#E5F4FF]">
      <Header/>
      <Hero />
      <Documentation />
      <Footer />
    </div>
  );
}
