
import React from "react";

const HeroImage = () => {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-brand-dark to-blue-900 rounded-lg p-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded p-4 border border-white/20">
            <div className="h-4 bg-brand-light/60 rounded w-3/4 mb-2"></div>
            <div className="h-24 bg-white/5 rounded"></div>
            <div className="h-4 bg-brand-light/30 rounded w-1/2 mt-2"></div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded p-4 border border-white/20">
            <div className="h-4 bg-brand-light/60 rounded w-1/2 mb-2"></div>
            <div className="h-24 bg-white/5 rounded"></div>
            <div className="h-4 bg-brand-light/30 rounded w-3/4 mt-2"></div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded p-4 border border-white/20">
            <div className="h-4 bg-brand-light/60 rounded w-2/3 mb-2"></div>
            <div className="h-24 bg-white/5 rounded"></div>
            <div className="h-4 bg-brand-light/30 rounded w-1/4 mt-2"></div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded p-4 border border-white/20">
            <div className="h-4 bg-brand-light/60 rounded w-1/4 mb-2"></div>
            <div className="h-24 bg-white/5 rounded"></div>
            <div className="h-4 bg-brand-light/30 rounded w-2/3 mt-2"></div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-30"></div>
      </div>
    </div>
  );
};

export default HeroImage;
