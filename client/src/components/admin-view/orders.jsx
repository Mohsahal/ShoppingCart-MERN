import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { Badge } from "../ui/badge";
import { AdminContext } from "@/context/admin-context";
import { BadgeCheck, Eye, Calendar, DollarSign, Package, Loader2 } from "lucide-react";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails, getAllOrdersForAdmin, getOrderDetailsForAdmin, setOrderDetails, isLoading } = useContext(AdminContext);

  function handleFetchOrderDetails(getId) {
    getOrderDetailsForAdmin(getId);
  }

  useEffect(() => {
    getAllOrdersForAdmin();
  }, []);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2.5">
          <BadgeCheck className="h-7 w-7 text-slate-900" />
          Order Management
        </h1>
        <p className="text-slate-500 text-xs">Monitor and process customer orders efficiently.</p>
      </div>

      <Card className="border border-slate-200/80 bg-white shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="bg-slate-50/70 border-b border-slate-200/80 px-6 sm:px-8 py-5">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-slate-900">Operational Log</CardTitle>
            <Badge variant="secondary" className="bg-slate-100 text-slate-700 border border-slate-200 font-bold px-3 py-1 text-xs">
              {orderList?.length || 0} Total Orders
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="border-slate-200/80 hover:bg-transparent">
                  <TableHead className="px-6 sm:px-8 py-4 font-bold text-slate-500 text-xs">Order ID</TableHead>
                  <TableHead className="font-bold text-slate-500 text-xs py-4">
                    <Calendar className="h-3.5 w-3.5 inline mr-1" />
                    Date
                  </TableHead>
                  <TableHead className="font-bold text-slate-500 text-xs text-center py-4">Status</TableHead>
                  <TableHead className="font-bold text-slate-500 text-xs text-center py-4">
                    <DollarSign className="h-3.5 w-3.5 inline" />
                    Price
                  </TableHead>
                  <TableHead className="px-6 sm:px-8 font-bold text-slate-500 text-xs text-right py-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-24 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <Loader2 className="h-8 w-8 text-slate-900 animate-spin" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : orderList && orderList.length > 0 ? (
                  orderList.map((orderItem) => (
                    <TableRow key={orderItem?._id} className="hover:bg-slate-50/80 transition-colors border-b border-slate-100">
                      <TableCell className="px-6 sm:px-8 py-5 font-medium text-slate-900">
                        <div className="flex flex-col">
                          <span className="font-bold text-xs text-slate-900">#{orderItem?._id.slice(-8).toUpperCase()}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{orderItem?._id}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 text-xs font-medium whitespace-nowrap">
                        {new Date(orderItem?.orderDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={`px-3 py-1 rounded-full capitalize font-bold text-[10px] tracking-wide border shadow-sm ${
                            orderItem?.orderStatus === "confirmed" || orderItem?.orderStatus === "delivered"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : orderItem?.orderStatus === "rejected"
                              ? "bg-rose-50 text-rose-700 border-rose-200"
                              : orderItem?.orderStatus === "processing"
                              ? "bg-sky-50 text-sky-700 border-sky-200"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full mr-1.5 inline-block ${
                            orderItem?.orderStatus === "confirmed" || orderItem?.orderStatus === "delivered" ? "bg-emerald-500" : 
                            orderItem?.orderStatus === "rejected" ? "bg-rose-500" : "bg-slate-500"
                          }`} />
                          {orderItem?.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center font-black text-slate-900 text-base">
                        ${orderItem?.totalAmount?.toLocaleString()}
                      </TableCell>
                      <TableCell className="px-6 sm:px-8 text-right">
                        <Dialog
                          open={openDetailsDialog}
                          onOpenChange={() => {
                            setOpenDetailsDialog(false);
                            setOrderDetails(null);
                          }}
                        >
                          <Button
                            onClick={() => handleFetchOrderDetails(orderItem?._id)}
                            variant="outline"
                            className="rounded-xl border-slate-200 bg-white text-slate-800 hover:bg-slate-900 hover:text-white font-bold text-xs h-8 px-3 gap-1.5 transition-all shadow-sm"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            View
                          </Button>
                          <AdminOrderDetailsView orderDetails={orderDetails} />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="py-24 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Package className="h-10 w-10 text-slate-400" />
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">No orders found in the system yet.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Footer Info */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium px-2">
        <p>© 2026 VELOURA Administrative Suite</p>
        <p className="flex items-center gap-1">
          <BadgeCheck className="h-3 w-3" />
          Encrypted & Synchronized
        </p>
      </div>
    </div>
  );
}

export default AdminOrdersView;


