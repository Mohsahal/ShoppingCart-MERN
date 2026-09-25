import { Link, Outlet } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left side - Editorial Image */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-slate-100">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop" 
          alt="Fashion Editorial"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <div className="absolute bottom-12 left-12 text-white max-w-md space-y-2">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="h-9 w-9 rounded-xl bg-white flex items-center justify-center text-slate-900 shadow-sm">
              <ShoppingBag className="h-5 w-5 text-slate-900" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white">
              VELOURA
            </span>
          </div>
          <p className="text-sm font-normal text-slate-200 leading-relaxed">
            Elevating everyday fashion essentials with timeless luxury, quality fabrics, and modern style.
          </p>
        </div>
      </div>
      
      {/* Right side - Form Area */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-white relative">
        <div className="absolute top-8 left-8 sm:top-10 sm:left-10">
          <Link to="/shop/home" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm group-hover:bg-slate-800 transition-colors">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-slate-700 transition-colors">
              VELOURA
            </span>
          </Link>
        </div>
        
        {/* Form Container */}
        <div className="w-full max-w-md pt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
