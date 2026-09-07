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
import { Eye, FileSearch, History, Loader2 } from "lucide-react";

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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-white text-slate-950 p-3 rounded-2xl shadow-md">
            <History className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">Order History</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">A historical record of your purchases</p>
          </div>
        </div>
        <div className="bg-slate-900/80 rounded-3xl border border-slate-800 shadow-xl p-20 flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 text-white animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
            <div className="bg-white text-slate-950 p-3 rounded-2xl shadow-md">
                <History className="h-5 w-5" />
            </div>
            <div>
                 <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">Order History</h2>
                 <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">A historical record of your purchases</p>
            </div>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
            <Table>
            <TableHeader className="bg-slate-950/70">
                <TableRow className="border-slate-800 hover:bg-transparent">
                    <TableHead className="font-bold text-slate-400 uppercase tracking-widest text-[10px] px-6 py-4">Order ID</TableHead>
                    <TableHead className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Date</TableHead>
                    <TableHead className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Status</TableHead>
                    <TableHead className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Total</TableHead>
                    <TableHead className="text-right px-6 font-bold text-slate-400 uppercase tracking-widest text-[10px]">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orderList && orderList.length > 0
                ? orderList.map((orderItem) => (
                    <TableRow key={orderItem?._id} className="border-slate-800/70 hover:bg-slate-800/40 transition-colors">
                        <TableCell className="px-6 py-4 font-mono text-xs text-slate-400">{orderItem?._id}</TableCell>
                        <TableCell className="font-bold text-slate-200 text-xs">{new Date(orderItem?.orderDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                        <Badge
                            className={`py-1 px-3 rounded-full font-bold text-[10px] uppercase tracking-wider border-none shadow-sm ${
                            orderItem?.orderStatus === "confirmed"
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : orderItem?.orderStatus === "rejected"
                                ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                : "bg-slate-800 text-slate-200 border border-slate-700"
                            }`}
                        >
                            {orderItem?.orderStatus}
                        </Badge>
                        </TableCell>
                        <TableCell className="font-bold text-white text-sm">${orderItem?.totalAmount?.toLocaleString()}</TableCell>
                        <TableCell className="text-right px-6">
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
                            className="rounded-xl border-slate-700 bg-slate-800/80 text-slate-200 font-bold h-9 px-4 text-xs gap-1.5 hover:bg-white hover:text-slate-950 transition-all shadow-sm"
                            >
                                <Eye size={13} />
                                View
                            </Button>
                            <ShoppingOrderDetailsView orderDetails={orderDetails} />
                        </Dialog>
                        </TableCell>
                    </TableRow>
                    ))
                : (
                    <TableRow>
                        <TableCell colSpan={5} className="py-16 text-center">
                            <div className="flex flex-col items-center justify-center space-y-3">
                                <div className="bg-slate-800/50 p-5 rounded-full">
                                    <FileSearch className="h-8 w-8 text-slate-500" />
                                </div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No orders found in your account</p>
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

