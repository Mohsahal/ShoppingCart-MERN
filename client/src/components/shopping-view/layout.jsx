import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import ShoppingFooter from "./footer";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-bone-50 overflow-hidden min-h-screen text-stone-900">
      {/* Announcement Bar */}
      <div className="bg-bone-950 text-bone-100 py-2 px-4 text-center border-b border-bone-900">
        <p className="text-xs font-medium text-stone-300">
          Free shipping on orders over $100 <span className="mx-2 text-stone-600">•</span> Use code <span className="font-bold text-bone-50 underline underline-offset-2">VELOURA20</span> for 20% off
        </p>
      </div>
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full flex-1">
        <Outlet />
      </main>
      <ShoppingFooter />
    </div>
  );
}

export default ShoppingLayout;
