"use client";
import { useEffect, useState } from "react";
import Home from "./(public)/page";
import Earth from "@/components/ui/Earth";

export default function FirstLoading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black from-25% via-slate-700 via-50% to-black to-75%">
        <div className="w-60 h-60">
          <Earth />
        </div>
      </div>
    );
  }

  return <Home />;
}
