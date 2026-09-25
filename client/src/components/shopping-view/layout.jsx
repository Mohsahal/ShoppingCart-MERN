import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import ShoppingFooter from "./footer";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* Announcement Bar */}
      <div className="bg-slate-900 text-white py-2 px-4 text-center">
        <p className="text-xs font-medium text-slate-200">
          Free shipping on orders over $100 <span className="mx-2 text-slate-500">•</span> Use code <span className="font-bold text-white underline underline-offset-2">VELOURA20</span> for 20% off
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
