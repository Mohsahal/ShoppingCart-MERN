import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
      <div className="max-w-xl w-full text-center space-y-8">
        <div className="inline-flex items-center rounded-full bg-white/5 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-300">
          Error 404
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
          Page not found
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto">
          The page you are looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back to shopping.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/shop/home"
            className="inline-flex items-center justify-center w-full sm:w-auto rounded-full bg-primary px-8 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg hover:bg-primary/90 transition-colors"
          >
            Go to Home
          </Link>
          <Link
            to="/auth/login"
            className="inline-flex items-center justify-center w-full sm:w-auto rounded-full border border-white/15 px-8 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
