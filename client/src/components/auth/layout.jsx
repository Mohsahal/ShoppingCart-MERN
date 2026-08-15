import { Link, Outlet } from "react-router-dom";

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
        {/* Very subtle gradient to ensure text readability if we wanted text, but we keep it minimal */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        <div className="absolute bottom-12 left-12 text-white">
          <h1 className="text-5xl font-black tracking-tighter uppercase mb-2">
            Veloura <span className="italic font-light">Studio</span>
          </h1>
          <p className="font-medium text-white/80 tracking-widest uppercase text-xs">
            Elevating everyday essentials
          </p>
        </div>
      </div>
      
      {/* Right side - Form Area */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-white relative">
        <div className="absolute top-8 left-8 sm:top-12 sm:left-12 lg:hidden">
          <Link to="/shop/home" className="flex items-center gap-2 group">
            <span className="text-2xl font-black tracking-tighter uppercase italic text-slate-900">
              Veloura
            </span>
          </Link>
        </div>
        
        {/* Form Container */}
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
