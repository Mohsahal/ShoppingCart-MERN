import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingContext } from "@/context/shopping-context";
import { AuthContext } from "@/context/auth-context";
import { ShieldCheck, CreditCard, ChevronRight, Package, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function ShoppingCheckout() {
  const { cartItems, approvalURL, createNewOrder } = useContext(ShoppingContext);
  const { user } = useContext(AuthContext);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const { toast } = useToast();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiatePaypalPayment() {
    if (cartItems.items.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });

      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });

      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    createNewOrder(orderData).then((data) => {
      if (data?.success) {
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-24">
      {/* Cinematic Banner */}
      <div className="relative h-[36vh] w-full overflow-hidden bg-slate-950 border-b border-slate-800/80">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483181957632-8bda974cbc91?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-25 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <Badge className="bg-white/10 text-slate-200 border border-white/20 py-1.5 px-6 rounded-full mb-3 text-[10px] font-bold tracking-[0.3em] uppercase backdrop-blur-md">
                Secure Procurement
              </Badge>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none mb-3">Finalizing <span className="text-slate-400 italic">Checkout</span></h1>
              <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                  <span>Bag</span>
                  <ChevronRight size={12} />
                  <span className="text-white">Review</span>
                  <ChevronRight size={12} />
                  <span>Payment</span>
              </div>
          </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 -mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Address Selection */}
            <div className="lg:col-span-7 space-y-8">
                <div className="bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-800 p-6 sm:p-10">
                   <div className="flex items-center gap-4 mb-8">
                        <div className="bg-white text-slate-950 p-3 rounded-2xl shadow-md">
                            <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                             <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">DELIVERY DESTINATION</h2>
                             <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Where shall we send your order?</p>
                        </div>
                   </div>
                   
                   <Address
                    selectedId={currentSelectedAddress}
                    setCurrentSelectedAddress={setCurrentSelectedAddress}
                    />
                </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5">
                <div className="bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-800 p-6 sm:p-8 sticky top-24">
                   <div className="flex items-center gap-4 mb-6">
                        <div className="bg-white text-slate-950 p-3 rounded-2xl shadow-md">
                            <Package className="h-6 w-6" />
                        </div>
                        <div>
                             <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">ORDER MANIFEST</h2>
                             <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">{cartItems?.items?.length || 0} Items Staged</p>
                        </div>
                   </div>

                   <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                    {cartItems && cartItems.items && cartItems.items.length > 0 ? (
                        cartItems.items.map((item) => (
                            <UserCartItemsContent key={item.productId} cartItem={item} />
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-slate-400 font-medium italic text-sm">Your manifest is currently empty.</p>
                        </div>
                    )}
                   </div>

                   <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subtotal</span>
                        <span className="text-base font-bold text-white">${totalCartAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center px-1">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Complimentary Shipping</span>
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">FREE</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 mt-4">
                        <span className="text-sm font-bold text-slate-300">Total Commitment</span>
                        <span className="text-2xl font-black text-white tracking-tight">${totalCartAmount.toLocaleString()}</span>
                      </div>
                   </div>

                   <div className="mt-8 space-y-4">
                        <Button 
                            onClick={handleInitiatePaypalPayment} 
                            disabled={isPaymentStart}
                            className="w-full py-6 rounded-2xl font-black text-sm tracking-wider uppercase bg-white hover:bg-slate-200 text-slate-950 shadow-xl transition-all flex items-center justify-center gap-3 group"
                        >
                            {isPaymentStart ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <CreditCard className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    SECURE PAYPAL CHECKOUT
                                </>
                            )}
                        </Button>
                        
                        <div className="flex items-center justify-center gap-2 py-1">
                            <ShieldCheck className="h-4 w-4 text-emerald-400" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Encrypted 256-Bit SSL Checkout</span>
                        </div>
                   </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;

