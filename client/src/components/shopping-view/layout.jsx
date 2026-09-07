import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import ShoppingFooter from "./footer";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-slate-950 text-slate-100 min-h-screen overflow-hidden">
      {/* Announcement Bar */}
      <div className="bg-black/90 text-white py-2 px-4 text-center border-b border-slate-900">
        <p className="text-xs font-medium text-slate-300">
          Free shipping on orders over $100 <span className="mx-2 text-slate-600">•</span> Use code <span className="font-bold text-white underline underline-offset-2">VELOURA20</span> for 20% off
        </p>
      </div>
      {/* Common Header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full bg-slate-950 flex-1">
        <Outlet />
      </main>
      <ShoppingFooter />
    </div>
  );
}

export default ShoppingLayout;
