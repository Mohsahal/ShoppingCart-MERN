import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import ShoppingFooter from "./footer";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* Announcement Bar */}
      <div className="bg-slate-900 text-white py-2.5 px-4 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
          Complimentary shipping on orders over $150 <span className="mx-2 text-white/40">|</span> Use code <span className="text-white underline underline-offset-4 cursor-pointer">VELOURA20</span>
        </p>
      </div>
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
      <ShoppingFooter />
    </div>
  );
}

export default ShoppingLayout;
