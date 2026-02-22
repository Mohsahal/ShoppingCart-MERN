import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContext, useEffect, useState } from "react";
import { CommonContext } from "@/context/common-context";
import { AdminContext } from "@/context/admin-context";
import Loader from "@/components/common/loader";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Plus, 
  Image as ImageIcon,
  Clock,
  ArrowUpRight
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
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  
  const { 
    featureImageList, 
    getFeatureImages, 
    addFeatureImage, 
    isLoading: commonLoading 
  } = useContext(CommonContext);
  
  const {
    productList,
    orderList,
    fetchAllProducts,
    getAllOrdersForAdmin,
    isLoading: adminLoading
  } = useContext(AdminContext);

  function handleUploadFeatureImage() {
    if (!uploadedImageUrl) return;
    
    addFeatureImage(uploadedImageUrl).then((data) => {
      if (data?.success) {
        getFeatureImages();
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  useEffect(() => {
    getFeatureImages();
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
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Total Orders",
      value: orderList?.length || 0,
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Total Products",
      value: productList?.length || 0,
      icon: LayoutDashboard,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      title: "Total Customers",
      value: "1,248", // Mocked for now
      icon: Users,
      color: "text-orange-600",
      bg: "bg-orange-100",
    }
  ];

  if (commonLoading || adminLoading) return <Loader />;

  return (
    <div className="flex flex-col gap-8 p-0">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
          <LayoutDashboard className="h-8 w-8 text-primary" />
          Dashboard Overview
        </h1>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock className="h-4 w-4" />
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon size={80} />
            </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">{stat.title}</CardTitle>
              <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3 text-green-500" />
                <span className="text-green-500 font-semibold">+12%</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        {/* Banner Management */}
        <Card className="border-none shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
             <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Homepage Banners</CardTitle>
             </div>
             <Badge variant="secondary" className="font-normal">
              {featureImageList?.length} images
             </Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-xl border-2 border-dashed border-slate-200 hover:border-primary/50 transition-colors duration-300">
              <ProductImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                setImageLoadingState={setImageLoadingState}
                imageLoadingState={imageLoadingState}
                isCustomStyling={true}
              />
              <Button 
                onClick={handleUploadFeatureImage} 
                disabled={!uploadedImageUrl || imageLoadingState}
                className="mt-6 w-full py-6 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                {imageLoadingState ? "Uploading..." : "Add New Banner"}
                <Plus className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                Current Banners
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {featureImageList && featureImageList.length > 0
                  ? featureImageList.map((featureImgItem, index) => (
                      <div key={index} className="group relative rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 aspect-video">
                        <img
                          src={featureImgItem.image}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <Badge className="bg-white text-slate-900 hover:bg-slate-100">Banner {index + 1}</Badge>
                        </div>
                      </div>
                    ))
                  : (
                    <div className="col-span-2 py-12 text-center text-slate-400 bg-slate-50 rounded-xl">
                      No banners uploaded yet
                    </div>
                  )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="border-none shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Latest Orders</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 font-semibold" onClick={() => window.location.href = '/admin/orders'}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-slate-100 overflow-x-auto">
              <div className="min-w-[500px]">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow>
                    <TableHead className="font-bold">Order ID</TableHead>
                    <TableHead className="font-bold text-center">Date</TableHead>
                    <TableHead className="font-bold text-center">Status</TableHead>
                    <TableHead className="font-bold text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderList && orderList.length > 0 ? (
                    orderList.slice(0, 5).map((orderItem) => (
                      <TableRow key={orderItem._id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="font-medium text-slate-600">
                          #{orderItem._id.slice(-6)}
                        </TableCell>
                        <TableCell className="text-center text-slate-500">
                          {new Date(orderItem.orderDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            className={`px-2 py-1 capitalize font-medium ${
                              orderItem?.orderStatus === "confirmed" || orderItem?.orderStatus === "delivered"
                                ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200"
                                : orderItem?.orderStatus === "rejected"
                                ? "bg-red-100 text-red-700 hover:bg-red-100 border-red-200"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200"
                            }`}
                            variant="outline"
                          >
                            {orderItem?.orderStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-bold text-slate-900">
                          ${orderItem.totalAmount}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center text-slate-400">
                        No orders found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-primary/5 rounded-xl flex items-center justify-between">
               <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-500">Inventory Status</span>
                  <span className="text-slate-900 font-bold">{productList?.length} Active Products</span>
               </div>
               <div className="flex -space-x-2">
                 {productList?.slice(0, 4).map((product, i) => (
                   <img key={i} src={product.image} className="h-8 w-8 rounded-full border-2 border-white object-cover" alt="" />
                 ))}
                 {productList?.length > 4 && (
                   <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
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
