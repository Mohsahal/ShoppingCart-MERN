import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:max-w-sm z-[99999] bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-800 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-500 text-slate-100">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center mb-2">
            <span className="text-xl">🍪</span>
          </div>
          <button 
            onClick={handleReject}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        
        <h3 className="text-base font-bold text-white tracking-tight mb-1.5">Privacy & Atelier Experience</h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-5 font-normal">
          We use cookies and telemetry to personalize your experience, preserve your luxury shopping bag, and optimize performance.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button 
            onClick={handleAccept}
            className="flex-1 bg-white text-slate-950 font-bold py-2.5 px-4 rounded-xl hover:bg-slate-200 transition-colors text-xs uppercase tracking-wider"
          >
            Accept All
          </button>
          <button 
            onClick={handleReject}
            className="flex-1 bg-slate-800 text-slate-300 font-bold py-2.5 px-4 rounded-xl hover:bg-slate-700 hover:text-white transition-colors text-xs uppercase tracking-wider border border-slate-700"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

