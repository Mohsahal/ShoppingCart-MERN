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
          title: "Cart item updated",
        });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    deleteCartItem(user?.id, getCartItem?.productId).then((data) => {
      if (data?.success) {
        toast({
          title: "Cart item removed",
        });
      }
    });
  }

  return (
    <div className="flex items-center gap-4 p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all group">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-950">
          <img
            src={cartItem?.image}
            alt={cartItem?.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
      </div>
      
      <div className="flex-1 min-w-0 space-y-1">
        <h3 className="font-bold text-white text-sm truncate">{cartItem?.title}</h3>
        <p className="text-xs text-slate-400 font-medium">${((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) || 0).toLocaleString()}</p>
        
        <div className="flex items-center gap-3 pt-1.5">
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                <Button
                    variant="ghost"
                    className="h-6 w-6 rounded-md p-0 text-slate-400 hover:text-white hover:bg-slate-800"
                    disabled={cartItem?.quantity === 1}
                    onClick={() => handleUpdateQuantity(cartItem, "minus")}
                >
                    <Minus className="w-3 h-3" />
                </Button>
                <span className="font-bold text-white text-xs px-1.5">{cartItem?.quantity}</span>
                <Button
                    variant="ghost"
                    className="h-6 w-6 rounded-md p-0 text-slate-400 hover:text-white hover:bg-slate-800"
                    onClick={() => handleUpdateQuantity(cartItem, "plus")}
                >
                    <Plus className="w-3 h-3" />
                </Button>
            </div>
            
            <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCartItemDelete(cartItem)}
                className="h-8 w-8 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-all"
            >
                <Trash2 className="w-3.5 h-3.5" />
            </Button>
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className="font-black text-white text-base">
          $
          {(
            ((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
              (cartItem?.quantity || 1)) ||
            0
          ).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default UserCartItemsContent;
