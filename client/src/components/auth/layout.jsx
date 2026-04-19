import { Link, Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to <span className="text-primary italic">Veloura</span>
          </h1>
          <p className="text-slate-400 font-medium">
            Step into a world of curated fashion and premium style essentials.
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 relative">
        <div className="absolute top-8 left-8 sm:top-12 sm:left-12">
          <Link to="/shop/home" className="flex items-center gap-2 group transition-all">
            <span className="text-2xl font-black tracking-tighter uppercase italic group-hover:scale-105 transition-transform">
              Veloura
            </span>
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
