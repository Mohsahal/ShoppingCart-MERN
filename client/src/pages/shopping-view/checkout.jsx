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
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Cinematic Banner */}
      <div className="relative h-[40vh] w-full overflow-hidden bg-slate-900">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483181957632-8bda974cbc91?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <Badge className="bg-primary/20 text-primary border-primary/30 py-1.5 px-6 rounded-full mb-4 text-[10px] font-black tracking-[0.4em] uppercase backdrop-blur-md">
                Secure Procurement
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-4">Finalizing <span className="text-primary italic">Checkout</span></h1>
              <div className="flex items-center gap-2 text-slate-400 font-bold text-sm uppercase tracking-widest">
                  <span>Cart</span>
                  <ChevronRight size={14} />
                  <span className="text-white">Review</span>
                  <ChevronRight size={14} />
                  <span>Payment</span>
              </div>
          </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Address Selection */}
            <div className="lg:col-span-7 space-y-8">
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 p-8 sm:p-12">
                   <div className="flex items-center gap-4 mb-10">
                        <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary/20">
                            <MapPin className="h-6 w-6 text-white" />
                        </div>
                        <div>
                             <h2 className="text-2xl font-black text-slate-900 tracking-tighter">DELIVERY DESTINATION</h2>
                             <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1 text-primary">Where shall we send your treasures?</p>
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
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-10 sticky top-24">
                   <div className="flex items-center gap-4 mb-8">
                        <div className="bg-slate-900 p-3 rounded-2xl">
                            <Package className="h-6 w-6 text-white" />
                        </div>
                        <div>
                             <h2 className="text-xl font-black text-slate-900 tracking-tight">ORDER MANIFEST</h2>
                             <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">{cartItems?.items?.length} Items Staged</p>
                        </div>
                   </div>

                   <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-100">
                    {cartItems && cartItems.items && cartItems.items.length > 0 ? (
                        cartItems.items.map((item) => (
                            <UserCartItemsContent key={item.productId} cartItem={item} />
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-slate-400 font-bold italic">Your manifest is currently empty.</p>
                        </div>
                    )}
                   </div>

                   <div className="mt-10 pt-8 border-t border-slate-100 space-y-4">
                      <div className="flex justify-between items-center px-2">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Subtotal</span>
                        <span className="text-lg font-black text-slate-900">${totalCartAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center px-2">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Global Logistics</span>
                        <span className="text-sm font-black text-emerald-600 uppercase">FREE SHIPPING</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-6 shadow-sm">
                        <span className="text-lg font-black text-slate-900">Total Commitment</span>
                        <span className="text-3xl font-black text-primary tracking-tighter">${totalCartAmount.toLocaleString()}</span>
                      </div>
                   </div>

                   <div className="mt-10 space-y-6">
                        <Button 
                            onClick={handleInitiatePaypalPayment} 
                            disabled={isPaymentStart}
                            className="w-full py-8 rounded-2xl font-black text-lg tracking-tighter uppercase shadow-2xl shadow-primary/20 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-4 group"
                        >
                            {isPaymentStart ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    Synchronizing...
                                </>
                            ) : (
                                <>
                                    <CreditCard className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                    SECURE PAYPAL CHECKOUT
                                </>
                            )}
                        </Button>
                        
                        <div className="flex items-center justify-center gap-2 py-2">
                            <ShieldCheck className="h-4 w-4 text-emerald-500" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Bank-Level 256-bit Encryption</span>
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
