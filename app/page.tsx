"use client";
import { useEffect, useState } from "react";
import Home from "./(public)/page";
import { motion } from "framer-motion";
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
      // <div className="flex items-center justify-center min-h-screen bg-gray-900">
      //   <div className="flex gap-2">
      //     {[0, 1, 2].map((i) => (
      //       <motion.div
      //         key={i}
      //         className="w-4 h-4 bg-white rounded-full"
      //         animate={{
      //           y: [0, -10, 0],
      //         }}
      //         transition={{
      //           duration: 0.6,
      //           repeat: Infinity,
      //           delay: i * 0.2,
      //         }}
      //       />
      //     ))}
      //   </div>
      // </div>
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-60 h-60">
          <Earth />
        </div>
      </div>
    );
  }

  return <Home />;
}
