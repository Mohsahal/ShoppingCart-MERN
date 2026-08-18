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
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:max-w-sm z-[99999] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-2">
            <span className="text-xl">🍪</span>
          </div>
          <button 
            onClick={handleReject}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <h3 className="text-lg font-black text-slate-900 tracking-tight mb-2">We value your privacy</h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium">
          We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. Please choose your preferences.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={handleAccept}
            className="flex-1 bg-slate-900 text-white font-bold py-3 px-4 rounded-xl hover:bg-slate-800 transition-colors text-xs uppercase tracking-widest"
          >
            Accept All
          </button>
          <button 
            onClick={handleReject}
            className="flex-1 bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-xl hover:bg-slate-200 transition-colors text-xs uppercase tracking-widest"
          >
            Reject All
          </button>
        </div>
      </div>
    </div>
  );
}
