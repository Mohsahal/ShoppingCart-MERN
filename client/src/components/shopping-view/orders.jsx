import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { Badge } from "../ui/badge";
import { ShoppingContext } from "@/context/shopping-context";
import { AuthContext } from "@/context/auth-context";
import Loader from "../common/loader";
import { Eye, FileSearch, History } from "lucide-react";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails, getAllOrdersByUserId, getOrderDetails, setOrderDetails, isLoading } = useContext(ShoppingContext);
  const { user } = useContext(AuthContext);

  function handleFetchOrderDetails(getId) {
    getOrderDetails(getId);
  }

  useEffect(() => {
    if (user?.id) getAllOrdersByUserId(user?.id);
  }, [user]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-6">
        <div className="flex items-center gap-4 mb-8">
            <div className="bg-primary/10 p-3 rounded-2xl">
                <History className="h-6 w-6 text-primary" />
            </div>
            <div>
                 <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Order Journal</h2>
                 <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">A historical record of your procurement</p>
            </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <Table>
            <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-100 hover:bg-transparent">
                    <TableHead className="font-black text-slate-400 uppercase tracking-widest text-[10px] px-8 py-5">Order ID</TableHead>
                    <TableHead className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Registry Date</TableHead>
                    <TableHead className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Status Badge</TableHead>
                    <TableHead className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Revenue Value</TableHead>
                    <TableHead className="text-right px-8 font-black text-slate-400 uppercase tracking-widest text-[10px]">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orderList && orderList.length > 0
                ? orderList.map((orderItem) => (
                    <TableRow key={orderItem?._id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <TableCell className="px-8 py-6 font-mono text-xs text-slate-500">{orderItem?._id}</TableCell>
                        <TableCell className="font-bold text-slate-700">{new Date(orderItem?.orderDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                        <Badge
                            className={`py-1.5 px-4 rounded-full font-black text-[10px] uppercase tracking-tighter border-none shadow-sm ${
                            orderItem?.orderStatus === "confirmed"
                                ? "bg-emerald-500 text-white"
                                : orderItem?.orderStatus === "rejected"
                                ? "bg-rose-500 text-white"
                                : "bg-slate-900 text-white"
                            }`}
                        >
                            {orderItem?.orderStatus}
                        </Badge>
                        </TableCell>
                        <TableCell className="font-black text-slate-900">${orderItem?.totalAmount.toLocaleString()}</TableCell>
                        <TableCell className="text-right px-8">
                        <Dialog
                            open={openDetailsDialog}
                            onOpenChange={() => {
                            setOpenDetailsDialog(false);
                            setOrderDetails(null);
                            }}
                        >
                            <Button
                            onClick={() =>
                                handleFetchOrderDetails(orderItem?._id)
                            }
                            variant="outline"
                            className="rounded-xl border-slate-200 text-slate-600 font-bold h-10 px-6 gap-2 hover:bg-white hover:text-primary hover:border-primary transition-all shadow-sm"
                            >
                                <Eye size={14} />
                                View
                            </Button>
                            <ShoppingOrderDetailsView orderDetails={orderDetails} />
                        </Dialog>
                        </TableCell>
                    </TableRow>
                    ))
                : (
                    <TableRow>
                        <TableCell colSpan={5} className="py-20 text-center">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="bg-slate-50 p-6 rounded-full">
                                    <FileSearch className="h-12 w-12 text-slate-200" />
                                </div>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No orders found in registry</p>
                            </div>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
    </div>
  );
}

export default ShoppingOrders;
