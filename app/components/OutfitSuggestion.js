import React from 'react';

export default function OutfitSuggestion({ outfit }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-5xl">{outfit.emoji}</span>
        <div>
          <p className="text-gray-300 text-sm">Outfit Suggestion</p>
          <p className="text-white font-semibold">{outfit.advice}</p>
        </div>
      </div>

      {/* Clothing items */}
      <div className="grid grid-cols-2 gap-2">
        {outfit.items.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-3 border border-white/20 hover:bg-white/15 transition-all duration-300 text-center group"
          >
            <p className="text-gray-300 text-sm group-hover:text-white transition-colors">
              {item}
            </p>
          </div>
        ))}
      </div>

      {/* Advice */}
      <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-lg rounded-xl p-4 border border-amber-400/30">
        <p className="text-amber-100 text-sm">
          💡 <span className="font-medium">Tip:</span> Check wind conditions and adjust layers accordingly!
        </p>
      </div>
    </div>
  );
}
