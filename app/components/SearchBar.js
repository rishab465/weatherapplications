"use client"
import React, { useState } from 'react';
import { RiSearchLine } from "@remixicon/react";

export default function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  const handleQuickSearch = (city) => {
    onSearch(city);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search any city worldwide..."
            disabled={loading}
            className="w-full px-6 py-3.5 bg-white/20 backdrop-blur-lg text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 disabled:opacity-50 hover:bg-white/25"
          />
          <RiSearchLine className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 pointer-events-none" size={20} />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3.5 bg-gradient-to-r from-white/30 to-white/20 hover:from-white/40 hover:to-white/30 backdrop-blur-lg text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 hover:shadow-lg hover:shadow-white/20 border border-white/30"
        >
          Search
        </button>
      </form>

      {/* Quick Search Buttons */}
      <div className="flex gap-2 flex-wrap justify-center">
        {['London', 'Tokyo', 'New York', 'Dubai', 'Sydney'].map((city) => (
          <button
            key={city}
            onClick={() => handleQuickSearch(city)}
            disabled={loading}
            className="px-5 py-2 bg-white/15 hover:bg-white/25 backdrop-blur-lg text-white text-sm rounded-full transition-all duration-300 disabled:opacity-50 hover:shadow-md hover:shadow-white/10 border border-white/20 group"
          >
            <span className="group-hover:scale-105 inline-block transition-transform">{city}</span>
          </button>
        ))}
      </div>

      {/* Search Hint */}
      <p className="text-center text-gray-400 text-xs font-medium">
        💡 Tip: Use country code for accuracy (e.g., "London, UK")
      </p>
    </div>
  );
}
