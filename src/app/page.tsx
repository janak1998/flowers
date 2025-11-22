"use client";

import { useState, useEffect } from "react";
import Scene from "@/components/Scene";
import FlowerBouquet from "@/components/FlowerBouquet";
import QuoteOverlay from "@/components/QuoteOverlay";
import AudioPlayer from "@/components/AudioPlayer";

const HOUR_COLORS = [
  "#1a237e", // 00:00 - Deep Blue
  "#1565c0", // 01:00
  "#1976d2", // 02:00
  "#1e88e5", // 03:00
  "#3949ab", // 04:00
  "#5e35b1", // 05:00 - Deep Purple
  "#f9a825", // 06:00 - Darker Yellow/Orange
  "#fbc02d", // 07:00
  "#f57f17", // 08:00
  "#e65100", // 09:00 - Deep Orange
  "#d84315", // 10:00
  "#c62828", // 11:00 - Red
  "#ad1457", // 12:00 - Pink
  "#880e4f", // 13:00
  "#4a148c", // 14:00
  "#311b92", // 15:00
  "#1a237e", // 16:00
  "#4a148c", // 17:00
  "#6a1b9a", // 18:00
  "#7b1fa2", // 19:00
  "#8e24aa", // 20:00
  "#4527a0", // 21:00
  "#283593", // 22:00
  "#1565c0", // 23:00
];

export default function Home() {
  const [color, setColor] = useState("#ffeb3b");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateColor = () => {
      const randomIndex = Math.floor(Math.random() * HOUR_COLORS.length);
      setColor(HOUR_COLORS[randomIndex]);
    };

    updateColor();
    // Change color every 5 minutes
    const intervalId = setInterval(updateColor, 5 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (!mounted) return null; // or a loading state


  return (
    <main className="relative w-full h-screen overflow-hidden">
      <Scene>
        <FlowerBouquet color={color} />
      </Scene>
      <QuoteOverlay />
      <AudioPlayer />

      {/* Time indicator (Optional, for debugging/visual) */}
      <div className="absolute top-4 left-4 text-black/30 text-xs font-mono">
        Color: {color}
      </div>
    </main>
  );
}
