import React from 'react';

export const PageLoader: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-24 px-6 text-center select-none" aria-busy="true" aria-label="Loading page">
      <div className="relative flex items-center justify-center">
        {/* Outer ambient glow */}
        <div className="w-12 h-12 rounded-full border-2 border-teal-500/20 animate-ping absolute inset-0" />
        {/* Spinning ring */}
        <div className="w-12 h-12 rounded-full border-2 border-transparent border-t-[#0D9488] border-r-[#0D9488]/40 animate-spin" />
      </div>
      <p className="mt-4 text-xs font-mono tracking-widest uppercase text-slate-400">
        Loading Archive...
      </p>
    </div>
  );
};
