"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

import quotes from "./Quotes.json";

interface Quote {
  text: string;
  author: string;
}

export default function QuoteOverlay() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = () => {
    setLoading(true);
    // Simulate network delay for effect
    setTimeout(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchQuote();
    const interval = setInterval(fetchQuote, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-11/12 max-w-lg p-6 rounded-2xl bg-black/5 backdrop-blur-md border border-black/10 shadow-xl text-center text-gray-800 z-10">
      {loading ? (
        <div className="animate-pulse">
          <div className="h-4 bg-black/10 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-black/10 rounded w-1/2 mx-auto"></div>
        </div>
      ) : (
        <>
          <p className="text-lg md:text-xl font-serif italic mb-4">"{quote?.text}"</p>
          <p className="text-sm font-medium opacity-80">— {quote?.author}</p>
        </>
      )}
      <button
        onClick={fetchQuote}
        className="absolute top-2 right-2 p-2 rounded-full hover:bg-black/10 transition-colors"
        aria-label="New Quote"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
      </button>
    </div>
  );
}
