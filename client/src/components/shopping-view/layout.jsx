import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import ShoppingFooter from "./footer";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* Announcement Bar */}
      <div className="bg-primary text-white py-2 px-4 text-center">
        <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em]">
          ✨ Free Shipping on orders over $150 | Use code <span className="underline cursor-pointer">VELOURA20</span> for 20% off ✨
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
