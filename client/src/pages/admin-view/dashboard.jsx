import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContext, useEffect } from "react";
import { AdminContext } from "@/context/admin-context";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Clock,
  ArrowUpRight,
  Loader2
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

function AdminDashboard() {
  const {
    productList,
    orderList,
    fetchAllProducts,
    getAllOrdersForAdmin,
    isLoading: adminLoading
  } = useContext(AdminContext);

  useEffect(() => {
    fetchAllProducts();
    getAllOrdersForAdmin();
  }, []);

  const totalSales = orderList
    ? orderList.reduce((acc, order) => 
        order.orderStatus !== 'rejected' ? acc + order.totalAmount : acc, 0
      )
    : 0;

  const stats = [
    {
      title: "Total Sales",
      value: `$${totalSales.toLocaleString()}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50 border border-emerald-100",
    },
    {
      title: "Total Orders",
      value: orderList?.length || 0,
      icon: ShoppingBag,
      color: "text-sky-600",
      bg: "bg-sky-50 border border-sky-100",
    },
    {
      title: "Total Products",
      value: productList?.length || 0,
      icon: LayoutDashboard,
      color: "text-purple-600",
      bg: "bg-purple-50 border border-purple-100",
    },
    {
      title: "Total Customers",
      value: "1,248",
      icon: Users,
      color: "text-amber-600",
      bg: "bg-amber-50 border border-amber-100",
    }
  ];

  if (adminLoading) {
    return (
      <div className="flex flex-col gap-8 p-0">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <LayoutDashboard className="h-7 w-7 text-slate-900" />
            Dashboard Overview
          </h1>
        </div>
        <div className="py-24 bg-white rounded-3xl border border-slate-200 flex flex-col items-center justify-center gap-4 shadow-sm">
          <Loader2 className="h-8 w-8 text-slate-900 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-0">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2.5">
          <LayoutDashboard className="h-7 w-7 text-slate-900" />
          Dashboard Overview
        </h1>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Clock className="h-3.5 w-3.5" />
          Updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border border-slate-200/80 bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 overflow-hidden relative group rounded-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 text-slate-900 transition-opacity">
              <stat.icon size={80} />
            </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.title}</CardTitle>
              <div className={`${stat.bg} ${stat.color} p-2 rounded-xl`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900">{stat.value}</div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3 text-emerald-600" />
                <span className="text-emerald-600 font-bold">+12%</span> this month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2">
        {/* Recent Orders */}
        <Card className="border border-slate-200/80 bg-white rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-slate-900" />
              <CardTitle className="text-base font-bold text-slate-900">Latest Orders</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 font-bold text-xs" onClick={() => window.location.href = '/admin/orders'}>
              View All
            </Button>
          </CardHeader>
          <CardContent className="p-4">
            <div className="rounded-xl border border-slate-200 overflow-x-auto">
              <div className="min-w-[500px]">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow className="border-slate-100">
                    <TableHead className="font-bold text-slate-500 text-xs">Order ID</TableHead>
                    <TableHead className="font-bold text-slate-500 text-xs text-center">Date</TableHead>
                    <TableHead className="font-bold text-slate-500 text-xs text-center">Status</TableHead>
                    <TableHead className="font-bold text-slate-500 text-xs text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderList && orderList.length > 0 ? (
                    orderList.slice(0, 5).map((orderItem) => (
                      <TableRow key={orderItem._id} className="hover:bg-slate-50/80 border-slate-100 transition-colors">
                        <TableCell className="font-mono text-xs text-slate-700 font-medium">
                          #{orderItem._id.slice(-6)}
                        </TableCell>
                        <TableCell className="text-center text-xs text-slate-500">
                          {new Date(orderItem.orderDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            className={`px-2 py-0.5 capitalize text-[10px] font-bold ${
                              orderItem?.orderStatus === "confirmed" || orderItem?.orderStatus === "delivered"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : orderItem?.orderStatus === "rejected"
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : "bg-slate-100 text-slate-700 border-slate-200"
                            }`}
                            variant="outline"
                          >
                            {orderItem?.orderStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-bold text-slate-900 text-xs">
                          ${orderItem.totalAmount}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center text-slate-400 text-xs">
                        No orders found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
               <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Inventory Status</span>
                  <span className="text-slate-900 font-bold text-sm">{productList?.length || 0} Active Products</span>
               </div>
               <div className="flex -space-x-2">
                 {productList?.slice(0, 4).map((product, i) => (
                   <img key={i} src={product.image} className="h-8 w-8 rounded-full border-2 border-white object-cover" alt="" />
                 ))}
                 {productList?.length > 4 && (
                   <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700">
                     +{productList.length - 4}
                   </div>
                 )}
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;


