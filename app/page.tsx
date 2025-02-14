"use client";
import { useEffect, useState } from "react";
import Earth from "@/components/Earth";
import MainVideo from "@/components/MainVideo";
import ResultsContent from "@/features/results/ResultsContent";

export default function FirstLoading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Earth />;
  }

  return (
    <>
      <MainVideo />
      <ResultsContent />
    </>
  );
}
