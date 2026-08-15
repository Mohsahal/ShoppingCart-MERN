import { HousePlug } from "lucide-react";
import { useEffect, useState } from "react";

function Loader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div 
      className={`flex flex-col items-center justify-center h-screen w-full bg-slate-50/90 backdrop-blur-3xl fixed top-0 left-0 z-[9999] transition-opacity duration-1000 ease-out ${mounted ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Soft elegant glowing background orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-slate-900 to-slate-600 blur-[80px] rounded-full animate-pulse w-64 h-64 -z-10 opacity-20 duration-[3000ms]"></div>
        
        {/* Animated Logo Container */}
        <div className="relative flex items-center justify-center w-28 h-28 rounded-full shadow-2xl bg-gradient-to-tr from-slate-900 to-slate-800 animate-logo-spin-float">
          {/* Inner rings */}
          <div className="absolute inset-0 border-[3px] border-t-white/40 border-r-white/10 border-b-transparent border-l-white/10 rounded-full animate-[spin_3s_linear_infinite]"></div>
          <div className="absolute inset-2 border-[2px] border-white/20 rounded-full animate-[spin_4s_linear_infinite_reverse]"></div>
          
          {/* Main Icon */}
          <HousePlug className="h-12 w-12 text-white drop-shadow-md z-10" strokeWidth={1.5} />
        </div>
        
        {/* Brand Text and Loading Status */}
        <div className="mt-12 flex flex-col items-center">
          <span className="font-black text-5xl tracking-tighter bg-gradient-to-r from-slate-900 via-slate-500 to-slate-900 bg-clip-text text-transparent animate-gradient-flow pb-2">
            Veloura
          </span>
          
          <div className="flex items-center gap-2 mt-6 bg-slate-200/50 px-4 py-1.5 rounded-full border border-slate-300/50 shadow-inner">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-600 animate-pulse">Initializing</span>
            <div className="flex gap-1 ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1s' }}></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-bounce" style={{ animationDelay: '150ms', animationDuration: '1s' }}></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-bounce" style={{ animationDelay: '300ms', animationDuration: '1s' }}></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
