import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { ShoppingBag } from "lucide-react";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md w-full flex flex-col p-0 border-l border-slate-800 bg-slate-950 text-white shadow-2xl">
      <SheetHeader className="p-6 border-b border-slate-900">
        <SheetTitle className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          Your Shopping Bag
        </SheetTitle>
      </SheetHeader>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => <UserCartItemsContent key={item.productId} cartItem={item} />)
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-10 text-slate-500">
              <ShoppingBag className="w-12 h-12 mb-3 text-slate-600 stroke-[1.5]" />
              <p className="font-medium text-sm">Your shopping bag is empty.</p>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-slate-900 bg-slate-950 space-y-5">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Total Amount</span>
          <span className="text-2xl font-black text-white tracking-tight">${totalCartAmount.toLocaleString()}</span>
        </div>
        
        <Button
          onClick={() => {
            navigate("/shop/checkout");
            setOpenCartSheet(false);
          }}
          className="w-full py-6 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold text-sm tracking-wider shadow-xl transition-all hover:scale-[1.01]"
        >
          Proceed to Checkout
        </Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
