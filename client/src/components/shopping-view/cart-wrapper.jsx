import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

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
    <SheetContent className="sm:max-w-md w-full flex flex-col p-0 border-none shadow-2xl">
      <SheetHeader className="p-6 border-b border-slate-50">
        <SheetTitle className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">
          Your <span className="text-primary">Manifest</span>
        </SheetTitle>
      </SheetHeader>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-100">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => <UserCartItemsContent key={item.productId} cartItem={item} />)
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-40">
              <p className="font-bold underline italic">Your manifest is currently empty.</p>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-slate-50 bg-slate-50/50 space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Aggregate Total</span>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">${totalCartAmount.toLocaleString()}</span>
        </div>
        
        <Button
          onClick={() => {
            navigate("/shop/checkout");
            setOpenCartSheet(false);
          }}
          className="w-full py-7 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 transform hover:-translate-y-0.5 transition-all"
        >
          Proceed to Checkout
        </Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
