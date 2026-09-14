import { Link, Outlet } from "react-router-dom";
import { ShoppingBag, ArrowLeft, ShieldCheck } from "lucide-react";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-slate-950 text-slate-100 selection:bg-white selection:text-black">
      {/* Left side - Editorial Image (Bright & Natural) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop" 
          alt="Fashion Editorial"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle Bottom Shade for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        
        <div className="absolute bottom-10 left-10 text-white max-w-md space-y-2.5 bg-black/45 backdrop-blur-md p-6 rounded-3xl border border-white/15 shadow-2xl">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-9 w-9 rounded-xl bg-white flex items-center justify-center text-slate-950 shadow-md">
              <ShoppingBag className="h-5 w-5 text-slate-950" />
            </div>
            <span className="font-extrabold text-2xl tracking-widest text-white uppercase">
              VELOURA
            </span>
          </div>
          <p className="text-xs font-normal text-slate-200 leading-relaxed">
            Elevating everyday fashion essentials with timeless luxury, quality fabrics, and modern style.
          </p>
        </div>
      </div>
      
      {/* Right side - Form Area */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-10 lg:p-12 bg-slate-950 relative overflow-hidden">
        {/* Ambient Subtle Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-800/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-950/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Bar */}
        <header className="w-full flex items-center justify-between relative z-10">
          <Link to="/shop/home" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white shadow-sm group-hover:bg-slate-800 group-hover:border-slate-700 transition-all">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-widest text-white group-hover:text-slate-300 transition-colors uppercase">
              VELOURA
            </span>
          </Link>

          <Link 
            to="/shop/home" 
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white px-3.5 py-1.5 rounded-full border border-slate-800/80 bg-slate-900/60 hover:bg-slate-800 transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to store
          </Link>
        </header>
        
        {/* Form Card Container */}
        <main className="my-auto py-8 w-full max-w-md mx-auto relative z-10">
          <div className="bg-slate-900/75 border border-white/10 rounded-3xl p-7 sm:p-9 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
            <Outlet />
          </div>
        </main>

        {/* Bottom Security Assurance */}
        <footer className="w-full text-center relative z-10 pt-2">
          <div className="inline-flex items-center justify-center gap-2 text-xs text-slate-500 font-normal">
            <ShieldCheck className="w-4 h-4 text-slate-500" />
            <span>Encrypted & secure authentication</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default AuthLayout;
