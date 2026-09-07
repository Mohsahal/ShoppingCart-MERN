import { useContext, useState } from "react";
import CommonForm from "../common/form";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { useToast } from "../ui/use-toast";
import { AdminContext } from "@/context/admin-context";
import { AuthContext } from "@/context/auth-context";
import { ClipboardList, MapPin, Package, CreditCard, Truck } from "lucide-react";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useContext(AuthContext);
  const { updateOrderStatus, getOrderDetailsForAdmin, getAllOrdersForAdmin } = useContext(AdminContext);
  const { toast } = useToast();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    updateOrderStatus(orderDetails?._id, status).then((data) => {
      if (data?.success) {
        getOrderDetailsForAdmin(orderDetails?._id);
        getAllOrdersForAdmin();
        setFormData(initialFormData);
        toast({
          title: "Order status updated successfully",
        });
      }
    });
  }
  return (
    <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-2xl">
      <DialogHeader className="bg-slate-50 px-6 sm:px-8 py-6 text-slate-900 border-b border-slate-200">
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                <DialogTitle className="text-xl font-black tracking-tight flex items-center gap-2 text-slate-900">
                    <ClipboardList className="h-5 w-5 text-slate-900" />
                    Order Manifest
                </DialogTitle>
                <DialogDescription className="text-slate-500 text-xs font-mono">ID: {orderDetails?._id}</DialogDescription>
            </div>
            <Badge className="bg-slate-900 text-white px-3 py-1 rounded-full font-bold text-[10px] tracking-wider uppercase">
                {orderDetails?.orderStatus?.toUpperCase()}
            </Badge>
        </div>
      </DialogHeader>

      <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
        {/* Core Info Grid */}
        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-500">
               <Package size={14} />
               <p className="text-[10px] font-bold uppercase tracking-wider">Order Summary</p>
            </div>
            <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Ordered On</span>
                    <span className="font-bold text-slate-900">{new Date(orderDetails?.orderDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Revenue</span>
                    <span className="font-bold text-slate-900">${orderDetails?.totalAmount?.toLocaleString()}</span>
                </div>
            </div>
          </div>
          
          <div className="space-y-3 border-l border-slate-200 pl-4">
            <div className="flex items-center gap-2 text-slate-500">
               <CreditCard size={14} />
               <p className="text-[10px] font-bold uppercase tracking-wider">Payment Details</p>
            </div>
            <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Method</span>
                    <span className="font-bold text-slate-900 capitalize">{orderDetails?.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-xs items-center">
                    <span className="text-slate-500">Status</span>
                    <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200 font-bold capitalize text-[10px] px-2 py-0.5">{orderDetails?.paymentStatus}</Badge>
                </div>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2">
              <Package className="h-3.5 w-3.5 text-slate-900" />
              Order Items ({orderDetails?.cartItems?.length})
          </h3>
          <div className="space-y-2">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
              ? orderDetails?.cartItems.map((item) => (
                  <div key={item?._id} className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900">{item.title}</span>
                        <span className="text-[11px] text-slate-500">Quantity: {item.quantity}</span>
                    </div>
                    <span className="font-bold text-slate-900 text-xs">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))
              : null}
          </div>
        </div>

        {/* Shipping Info */}
        <div className="space-y-3">
           <h3 className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-slate-900" />
                Shipping & Logistic Details
            </h3>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-0.5">
                        <Label className="text-[9px] text-slate-400 uppercase font-bold">Recipient</Label>
                        <p className="text-xs font-bold text-slate-900">{user?.userName}</p>
                    </div>
                    <div className="space-y-0.5">
                        <Label className="text-[9px] text-slate-400 uppercase font-bold">Phone</Label>
                        <p className="text-xs font-bold text-slate-900">{orderDetails?.addressInfo?.phone}</p>
                    </div>
                    <div className="col-span-2 space-y-0.5 pt-1">
                        <Label className="text-[9px] text-slate-400 uppercase font-bold">Address</Label>
                        <p className="text-xs font-normal text-slate-700 leading-relaxed">
                            {orderDetails?.addressInfo?.address}, {orderDetails?.addressInfo?.city} - {orderDetails?.addressInfo?.pincode}
                        </p>
                    </div>
                    {orderDetails?.addressInfo?.notes && (
                        <div className="col-span-2 space-y-0.5 pt-1">
                            <Label className="text-[9px] text-slate-400 uppercase font-bold">Delivery Instructions</Label>
                            <p className="text-[11px] italic text-slate-500">"{orderDetails?.addressInfo?.notes}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Action Section */}
        <div className="pt-4 border-t border-slate-200">
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <div className="flex items-center gap-2 mb-4">
                <Truck className="h-4 w-4 text-slate-900" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Logistics Control</h3>
            </div>
            <CommonForm
                formControls={[
                {
                    label: "Assign New Status",
                    name: "status",
                    componentType: "select",
                    options: [
                    { id: "pending", label: "Pending Revision" },
                    { id: "inProcess", label: "Active Processing" },
                    { id: "inShipping", label: "Out for Delivery" },
                    { id: "delivered", label: "Signed & Delivered" },
                    { id: "rejected", label: "Rejected / Cancelled" },
                    ],
                },
                ]}
                formData={formData}
                setFormData={setFormData}
                buttonText={"Commit Status Change"}
                onSubmit={handleUpdateStatus}
                isLight={true}
            />
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;


