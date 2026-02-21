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
import Loader from "../common/loader";
import { BadgeCheck, Eye, Calendar, DollarSign, Package } from "lucide-react";

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

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
          <BadgeCheck className="h-8 w-8 text-primary" />
          Order Management
        </h1>
        <p className="text-slate-500 text-sm">Monitor and process customer orders efficiently.</p>
      </div>

      <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-white border-b px-8 py-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-slate-800">Operational Log</CardTitle>
            <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-medium px-4 py-1">
              {orderList?.length} Total Orders
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="px-8 py-5 font-bold text-slate-600">Order ID</TableHead>
                  <TableHead className="font-bold text-slate-600 flex items-center gap-1 py-5">
                    <Calendar className="h-4 w-4" />
                    Date
                  </TableHead>
                  <TableHead className="font-bold text-slate-600 text-center py-5">Status</TableHead>
                  <TableHead className="font-bold text-slate-600 text-center py-5">
                    <DollarSign className="h-4 w-4 inline" />
                    Price
                  </TableHead>
                  <TableHead className="px-8 font-bold text-slate-600 text-right py-5">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderList && orderList.length > 0 ? (
                  orderList.map((orderItem) => (
                    <TableRow key={orderItem?._id} className="hover:bg-slate-50/30 transition-colors border-b border-slate-50">
                      <TableCell className="px-8 py-6 font-medium text-slate-800">
                        <div className="flex flex-col">
                          <span className="font-bold">#{orderItem?._id.slice(-8).toUpperCase()}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{orderItem?._id}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 font-medium whitespace-nowrap">
                        {new Date(orderItem?.orderDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={`px-4 py-1.5 rounded-full capitalize font-semibold tracking-wide border shadow-sm ${
                            orderItem?.orderStatus === "confirmed" || orderItem?.orderStatus === "delivered"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100"
                              : orderItem?.orderStatus === "rejected"
                              ? "bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100"
                              : orderItem?.orderStatus === "processing"
                              ? "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full mr-2 inline-block ${
                            orderItem?.orderStatus === "confirmed" || orderItem?.orderStatus === "delivered" ? "bg-emerald-500" : 
                            orderItem?.orderStatus === "rejected" ? "bg-rose-500" : "bg-slate-500"
                          }`} />
                          {orderItem?.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center font-extrabold text-slate-900 text-lg">
                        ${orderItem?.totalAmount.toLocaleString()}
                      </TableCell>
                      <TableCell className="px-8 text-right">
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
                            className="rounded-xl border-slate-200 hover:bg-primary hover:text-white hover:border-primary flex items-center gap-2 transition-all duration-300"
                          >
                            <Eye className="h-4 w-4" />
                            View Details
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
                        <Package className="h-12 w-12 text-slate-200" />
                        <p className="text-slate-500 font-medium">No orders found in the system yet.</p>
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
      <div className="flex items-center justify-between text-xs text-slate-400 font-medium px-4">
        <p>© 2026 ShoppingCart Administrative Portal</p>
        <p className="flex items-center gap-1">
          <BadgeCheck className="h-3 w-3" />
          System Active
        </p>
      </div>
    </div>
  );
}

export default AdminOrdersView;
