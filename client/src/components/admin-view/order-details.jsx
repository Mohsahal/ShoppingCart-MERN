import { useContext, useState } from "react";
import CommonForm from "../common/form";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
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
    <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden rounded-3xl border-none shadow-2xl">
      <DialogHeader className="bg-slate-900 px-8 py-8 text-white">
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                <DialogTitle className="text-2xl font-black tracking-tight flex items-center gap-2">
                    <ClipboardList className="h-6 w-6 text-primary-foreground" />
                    Order Manifest
                </DialogTitle>
                <DialogDescription className="text-slate-400 text-xs font-mono">ID: {orderDetails?._id}</DialogDescription>
            </div>
            <Badge className="bg-primary text-white hover:bg-primary px-4 py-1.5 rounded-full font-bold">
                {orderDetails?.orderStatus.toUpperCase()}
            </Badge>
        </div>
      </DialogHeader>

      <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
        {/* Core Info Grid */}
        <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-500">
               <Package size={16} />
               <p className="text-xs font-bold uppercase tracking-wider">Order Summary</p>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-sm font-medium text-slate-600">Ordered On</span>
                    <span className="text-sm font-bold text-slate-900">{new Date(orderDetails?.orderDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm font-medium text-slate-600">Total Revenue</span>
                    <span className="text-sm font-bold text-slate-900">${orderDetails?.totalAmount.toLocaleString()}</span>
                </div>
            </div>
          </div>
          
          <div className="space-y-4 border-l border-slate-200 pl-6">
            <div className="flex items-center gap-2 text-slate-500">
               <CreditCard size={16} />
               <p className="text-xs font-bold uppercase tracking-wider">Payment Details</p>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-sm font-medium text-slate-600">Method</span>
                    <span className="text-sm font-bold text-slate-900 capitalize">{orderDetails?.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm font-medium text-slate-600">Status</span>
                    <Badge variant="outline" className="bg-white font-bold capitalize">{orderDetails?.paymentStatus}</Badge>
                </div>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary" />
                  Order Items ({orderDetails?.cartItems?.length})
              </h3>
          </div>
          <div className="space-y-2">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
              ? orderDetails?.cartItems.map((item) => (
                  <div key={item?._id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:shadow-sm transition-shadow">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{item.title}</span>
                        <span className="text-xs text-slate-500 font-medium">Quantity: {item.quantity}</span>
                    </div>
                    <span className="font-bold text-slate-900">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))
              : null}
          </div>
        </div>

        {/* Shipping Info */}
        <div className="space-y-4">
           <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Shipping & Logistic Details
            </h3>
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label className="text-[10px] text-slate-400 uppercase font-bold">Recipient</Label>
                        <p className="text-sm font-bold text-slate-900">{user?.userName}</p>
                    </div>
                    <div className="space-y-1">
                        <Label className="text-[10px] text-slate-400 uppercase font-bold">Phone</Label>
                        <p className="text-sm font-bold text-slate-900">{orderDetails?.addressInfo?.phone}</p>
                    </div>
                    <div className="col-span-2 space-y-1">
                        <Label className="text-[10px] text-slate-400 uppercase font-bold">Address</Label>
                        <p className="text-sm font-medium text-slate-700 leading-relaxed">
                            {orderDetails?.addressInfo?.address}, {orderDetails?.addressInfo?.city} - {orderDetails?.addressInfo?.pincode}
                        </p>
                    </div>
                    {orderDetails?.addressInfo?.notes && (
                        <div className="col-span-2 space-y-1">
                            <Label className="text-[10px] text-slate-400 uppercase font-bold">Delivery Instructions</Label>
                            <p className="text-xs italic text-slate-500">"{orderDetails?.addressInfo?.notes}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Action Section */}
        <div className="pt-6 border-t border-slate-100">
          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
            <div className="flex items-center gap-2 mb-4">
                <Truck className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold text-primary">Logistics Control</h3>
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
            />
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
