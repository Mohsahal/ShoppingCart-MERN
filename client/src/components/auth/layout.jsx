import { Link, Outlet } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-slate-950 text-slate-100">
      {/* Left side - Editorial Image (Bright & Natural) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-slate-100">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop" 
          alt="Fashion Editorial"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle Bottom Shade for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute bottom-10 left-10 text-white max-w-md space-y-2.5 bg-black/40 backdrop-blur-md p-6 rounded-3xl border border-white/15 shadow-2xl">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-9 w-9 rounded-xl bg-white flex items-center justify-center text-slate-950 shadow-md">
              <ShoppingBag className="h-5 w-5 text-slate-950" />
            </div>
            <span className="font-extrabold text-2xl tracking-widest text-white uppercase">
              VELOURA
            </span>
          </div>
          <p className="text-xs font-normal text-slate-100 leading-relaxed">
            Elevating everyday fashion essentials with timeless luxury, quality fabrics, and modern style.
          </p>
        </div>
      </div>
      
      {/* Right side - Form Area */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-slate-950 relative">
        <div className="absolute top-8 left-8 sm:top-10 sm:left-10">
          <Link to="/shop/home" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white shadow-sm group-hover:bg-slate-800 transition-colors">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-widest text-white group-hover:text-slate-300 transition-colors uppercase">
              VELOURA
            </span>
          </Link>
        </div>
        
        {/* Form Container */}
        <div className="w-full max-w-md pt-8 bg-slate-900/70 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;


