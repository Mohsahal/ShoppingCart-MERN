

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  CreditCard,
  Zap,
  Shirt,
  Baby,
  Watch,
  Footprints,
  UserCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from "@/context/auth-context";
import { ShoppingContext } from "@/context/shopping-context";
import { CommonContext } from "@/context/common-context";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { Badge } from "@/components/ui/badge";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: Shirt },
  { id: "women", label: "Women", icon: UserCircle },
  { id: "kids", label: "Kids", icon: Baby },
  { id: "accessories", label: "Accessories", icon: Watch },
  { id: "footwear", label: "Footwear", icon: Footprints },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike" },
  { id: "adidas", label: "Adidas" },
  { id: "puma", label: "Puma" },
  { id: "levi", label: "Levi's" },
  { id: "zara", label: "Zara" },
  { id: "h&m", label: "H&M" },
];

function ShoppingHome() {
  const {
    productList,
    productDetails,
    fetchAllFilteredProducts,
    fetchProductDetails,
    addToCart,
  } = useContext(ShoppingContext);
  const { getFeatureImages } = useContext(CommonContext);
  const { user } = useContext(AuthContext);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = { [section]: [getCurrentItem.id] };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    fetchProductDetails(getCurrentProductId);
  }

  function handleAddtoCart(getCurrentProductId) {
    if (!user) {
      navigate('/auth/login');
      return;
    }
    addToCart(user?.id, getCurrentProductId, 1).then((data) => {
      if (data?.success) {
        toast({ title: "Product is added to cart" });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    fetchAllFilteredProducts({}, "price-lowtohigh");
    getFeatureImages();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-slate-50 via-transparent to-primary/5" />
        <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 lg:py-16 flex flex-col lg:flex-row items-center gap-10">
            <div className="max-w-xl text-center lg:text-left space-y-5 sm:space-y-6">
              <Badge className="bg-primary/5 text-primary border-none rounded-full px-4 py-1 text-[10px] uppercase tracking-[0.25em]">
                New Collection
              </Badge>
              <h1 className="text-3xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                Elevate your wardrobe with curated{" "}
                <span className="text-primary italic">style essentials</span>.
              </h1>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Discover premium fashion for every occasion, handpicked from
                world-class brands.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => navigate("/shop/listing")}
                  className="bg-primary hover:bg-primary/90 text-white font-black px-6 py-4 rounded-2xl text-sm shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                >
                  Explore products
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="hidden lg:block flex-1">
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {categoriesWithIcon.slice(0, 4).map((categoryItem) => (
                  <div key={categoryItem.id} className="rounded-2xl bg-white border border-slate-100 px-4 py-5 flex flex-col items-start gap-3 shadow-sm">
                    <div className="rounded-xl bg-primary/5 p-2.5">
                      <categoryItem.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-[0.25em]">{categoryItem.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar - Optimized 2x2 Grid for Mobile */}
      <div className="bg-white border-y py-8 sm:py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              { icon: Truck, title: "Swift Delivery", desc: "Over $150" },
              { icon: ShieldCheck, title: "Secure Pay", desc: "100% Encrypted" },
              { icon: CreditCard, title: "Flexible", desc: "Buy Now Pay Later" },
              { icon: Zap, title: "24/7 Care", desc: "Premium Support" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 group">
                <div className="bg-slate-50 p-3 rounded-2xl group-hover:bg-primary/10 transition-colors shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-black text-slate-900 text-[11px] sm:text-sm uppercase tracking-tighter">{item.title}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section - Grid for both Mobile and Desktop (No Scroll) */}
      <section id="category-section" className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center md:text-left mb-8">
            <Badge className="bg-primary/5 text-primary border-none rounded-full px-4 mb-3 font-black text-[10px] uppercase tracking-widest">
              Collections
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              The <span className="text-primary italic">Style</span> Hub
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
            {categoriesWithIcon.map((categoryItem) => (
              <div
                key={categoryItem.id}
                onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                className="group cursor-pointer border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl sm:rounded-3xl overflow-hidden bg-white p-5 sm:p-8 flex flex-col items-center justify-center relative text-center"
              >
                <div className="absolute top-0 right-0 p-2 opacity-[0.04] group-hover:opacity-10 transition-opacity">
                  <categoryItem.icon className="w-16 h-16 sm:w-24 sm:h-24" />
                </div>
                <div className="mb-3 sm:mb-5 group-hover:scale-110 transition-transform duration-300">
                  <div className="bg-primary/5 p-3 sm:p-4 rounded-2xl sm:rounded-3xl">
                    <categoryItem.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </div>
                </div>
                <span className="font-black text-xs sm:text-base text-slate-900 uppercase tracking-tight">
                  {categoryItem.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Products Section */}
      <section className="py-12 sm:py-24 bg-slate-50/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16 space-y-2">
            <h2 className="text-3xl sm:text-6xl font-black text-slate-900 tracking-tighter">CURATED <span className="text-primary italic">ESSENTIALS</span></h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto text-xs sm:text-sm">Trending pieces chosen for your premium lifestyle.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-10">
            {productList?.length > 0 && productList.map((productItem) => (
              <ShoppingProductTile
                handleGetProductDetails={handleGetProductDetails}
                product={productItem}
                handleAddtoCart={handleAddtoCart}
                key={productItem._id}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brands Flow Section */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter">WORLD CLASS <span className="text-primary italic">BRANDS</span></h2>
            </div>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
              {brandsWithIcon.map((brandItem) => (
                <div
                  key={brandItem.id}
                  onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                  className="cursor-pointer group bg-slate-50 hover:bg-primary transition-all duration-300 p-5 sm:p-8 rounded-2xl flex items-center justify-center border border-slate-100"
                >
                  <span className="font-black text-sm sm:text-lg text-slate-400 group-hover:text-white transition-colors uppercase italic">
                    {brandItem.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;