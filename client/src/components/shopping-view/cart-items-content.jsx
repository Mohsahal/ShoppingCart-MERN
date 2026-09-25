import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useContext } from "react";
import { useToast } from "../ui/use-toast";
import { ShoppingContext } from "@/context/shopping-context";
import { AuthContext } from "@/context/auth-context";

function UserCartItemsContent({ cartItem }) {
  const { user } = useContext(AuthContext);
  const { cartItems, productList, updateCartQuantity, deleteCartItem } = useContext(ShoppingContext);
  const { toast } = useToast();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction == "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });

            return;
          }
        }
      }
    }

    updateCartQuantity(
      user?.id,
      getCartItem?.productId,
      typeOfAction === "plus"
        ? getCartItem?.quantity + 1
        : getCartItem?.quantity - 1
    ).then((data) => {
      if (data?.success) {
        toast({
          title: "Cart item is updated successfully",
        });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    deleteCartItem(user?.id, getCartItem?.productId).then((data) => {
      if (data?.success) {
        toast({
          title: "Cart item is deleted successfully",
        });
      }
    });
  }

  return (
    <div className="flex items-center gap-6 p-4 bg-white rounded-2xl border border-slate-100 hover:shadow-md transition-all group">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-50">
          <img
            src={cartItem?.image}
            alt={cartItem?.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
      </div>
      
      <div className="flex-1 space-y-1">
        <h3 className="font-black text-slate-800 tracking-tight leading-none truncate max-w-[200px]">{cartItem?.title}</h3>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Unit Price: ${((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) || 0).toLocaleString()}</p>
        
        <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-full border border-slate-100">
                <Button
                    variant="ghost"
                    className="h-7 w-7 rounded-full p-0 text-slate-500 hover:bg-white hover:text-primary transition-all"
                    disabled={cartItem?.quantity === 1}
                    onClick={() => handleUpdateQuantity(cartItem, "minus")}
                >
                    <Minus className="w-3.5 h-3.5" />
                </Button>
                <span className="font-black text-slate-800 text-sm px-2">{cartItem?.quantity}</span>
                <Button
                    variant="ghost"
                    className="h-7 w-7 rounded-full p-0 text-slate-500 hover:bg-white hover:text-primary transition-all"
                    onClick={() => handleUpdateQuantity(cartItem, "plus")}
                >
                    <Plus className="w-3.5 h-3.5" />
                </Button>
            </div>
            
            <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCartItemDelete(cartItem)}
                className="h-9 w-9 rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-black text-slate-900 text-lg tracking-tighter">
          $
          {(
            ((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
              (cartItem?.quantity || 1)) ||
            0
          ).toLocaleString()}
        </p>
        {cartItem?.salePrice > 0 && (
             <p className="text-[10px] text-emerald-600 font-black uppercase tracking-tighter animate-pulse">Saved ${( (cartItem.price - cartItem.salePrice) * cartItem.quantity ).toFixed(2)}</p>
        )}
      </div>
    </div>
  );
}

export default UserCartItemsContent;
