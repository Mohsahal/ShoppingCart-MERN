import { useContext } from "react";
import { Badge } from "../ui/badge";
import { 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "../ui/dialog";
import { Label } from "../ui/label";
import { AuthContext } from "@/context/auth-context";
import { ClipboardList, MapPin, Package, CreditCard } from "lucide-react";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useContext(AuthContext);

  return (
    <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 text-slate-100 shadow-2xl">
      <DialogHeader className="bg-slate-950 px-6 sm:px-8 py-6 text-white border-b border-slate-800">
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                <DialogTitle className="text-xl font-black tracking-tight flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-white" />
                    Order Receipt
                </DialogTitle>
                <DialogDescription className="text-slate-400 text-xs font-mono">ID: {orderDetails?._id}</DialogDescription>
            </div>
            <Badge className="bg-white text-slate-950 font-bold px-3 py-1 rounded-full text-[10px] tracking-wider uppercase">
                {orderDetails?.orderStatus?.toUpperCase()}
            </Badge>
        </div>
      </DialogHeader>

      <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
        {/* Core Info Grid */}
        <div className="grid grid-cols-2 gap-4 bg-slate-950/70 p-5 rounded-2xl border border-slate-800">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-400">
               <Package size={14} />
               <p className="text-[10px] font-bold uppercase tracking-wider">Purchase Summary</p>
            </div>
            <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Date</span>
                    <span className="font-bold text-white">{new Date(orderDetails?.orderDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Total</span>
                    <span className="font-black text-white">${orderDetails?.totalAmount?.toLocaleString()}</span>
                </div>
            </div>
          </div>
          
          <div className="space-y-3 border-l border-slate-800 pl-4">
            <div className="flex items-center gap-2 text-slate-400">
               <CreditCard size={14} />
               <p className="text-[10px] font-bold uppercase tracking-wider">Payment Status</p>
            </div>
            <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Method</span>
                    <span className="font-bold text-white capitalize">{orderDetails?.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-xs items-center">
                    <span className="text-slate-400">State</span>
                    <Badge variant="outline" className="bg-slate-800 text-slate-200 border-slate-700 font-bold capitalize text-[10px] px-2 py-0.5">
                      {orderDetails?.paymentStatus}
                    </Badge>
                </div>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <Package className="h-3.5 w-3.5 text-white" />
              Order Items
          </h3>
          <div className="space-y-2">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
              ? orderDetails?.cartItems.map((item) => (
                  <div key={item?._id} className="flex items-center justify-between p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-white">{item.title}</span>
                        <span className="text-[11px] text-slate-400">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-bold text-white text-xs">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))
              : null}
          </div>
        </div>

        {/* Shipping Info */}
        <div className="space-y-3 pb-2">
           <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-white" />
                Delivery Information
            </h3>
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5">
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-0.5">
                        <Label className="text-[9px] text-slate-500 uppercase font-bold">Recipient</Label>
                        <p className="text-xs font-bold text-slate-200">{user?.userName}</p>
                    </div>
                    <div className="space-y-0.5">
                        <Label className="text-[9px] text-slate-500 uppercase font-bold">Phone</Label>
                        <p className="text-xs font-bold text-slate-200">{orderDetails?.addressInfo?.phone}</p>
                    </div>
                    <div className="col-span-2 space-y-0.5 pt-1">
                        <Label className="text-[9px] text-slate-500 uppercase font-bold">Full Address</Label>
                        <p className="text-xs font-normal text-slate-300 leading-relaxed">
                            {orderDetails?.addressInfo?.address}, {orderDetails?.addressInfo?.city} - {orderDetails?.addressInfo?.pincode}
                        </p>
                    </div>
                    {orderDetails?.addressInfo?.notes && (
                        <div className="col-span-2 space-y-0.5 pt-1">
                            <Label className="text-[9px] text-slate-500 uppercase font-bold">Notes</Label>
                            <p className="text-[11px] italic text-slate-400">"{orderDetails?.addressInfo?.notes}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;

