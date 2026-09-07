import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Shirt,
  Baby,
  Watch,
  Footprints,
  UserCircle,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from "@/context/auth-context";
import { ShoppingContext } from "@/context/shopping-context";
import { CommonContext } from "@/context/common-context";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import VideoScrollHero from "@/components/shopping-view/video-scroll-hero";
import { motion } from "framer-motion";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: Shirt },
  { id: "women", label: "Women", icon: UserCircle },
  { id: "kids", label: "Kids", icon: Baby },
  { id: "footwear", label: "Footwear", icon: Footprints },
  { id: "accessories", label: "Accessories", icon: Watch },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike" },
  { id: "adidas", label: "Adidas" },
  { id: "puma", label: "Puma" },
  { id: "levi", label: "Levi's" },
  { id: "zara", label: "Zara" },
  { id: "h&m", label: "H&M" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function ShoppingHome() {
  const {
    productList,
    productDetails,
    fetchAllFilteredProducts,
    fetchProductDetails,
    addToCart,
    isLoading,
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

  function handleAddtoCart(getCurrentProductId, totalStock = 10) {
    if (!user) {
      navigate("/auth/login");
      return;
    }
    addToCart(user?.id, getCurrentProductId, 1).then((data) => {
      if (data?.success) {
        toast({ title: "Product added to cart" });
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
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      {/* 1. Autoplaying Background Video Hero */}
      <VideoScrollHero />

      {/* 2. Trust & Service Highlights */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900/40 border-b border-slate-900 py-6 sm:py-8"
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On all orders over $100" },
              { icon: ShieldCheck, title: "Secure Payment", desc: "100% protected checkout" },
              { icon: RotateCcw, title: "Easy Returns", desc: "30-day money-back guarantee" },
              { icon: Headphones, title: "24/7 Support", desc: "Dedicated customer service" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3.5 p-2 rounded-xl"
              >
                <div className="bg-slate-900 p-3 rounded-xl shadow-md border border-slate-800 shrink-0 text-white">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{item.title}</p>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3. Shop by Category with Staggered Scroll Animation */}
      <section id="category-section" className="py-14 sm:py-20 bg-slate-950">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
              Shop by Category
            </h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Explore our wide selection of essentials across all styles and categories.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6"
          >
            {categoriesWithIcon.map((categoryItem) => (
              <motion.div
                key={categoryItem.id}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                className="group cursor-pointer border border-slate-800 shadow-md hover:shadow-2xl hover:border-slate-500 transition-all duration-300 rounded-2xl bg-slate-900/60 p-6 sm:p-8 flex flex-col items-center justify-center text-center"
              >
                <div className="mb-4 bg-slate-800/80 group-hover:bg-white group-hover:text-slate-950 transition-colors duration-300 p-4 rounded-2xl text-slate-200 shadow-inner">
                  <categoryItem.icon className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="font-bold text-sm sm:text-base text-white">
                  {categoryItem.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Trending Products Section with Scroll Reveal */}
      <section className="py-14 sm:py-20 bg-slate-900/40 border-y border-slate-900">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4"
          >
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                Trending Products
              </h2>
              <p className="text-sm text-slate-400">
                Discover our top selling styles and newest arrivals.
              </p>
            </div>
            <Button 
              variant="outline"
              onClick={() => navigate("/shop/listing")}
              className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-white hover:text-slate-950 font-bold px-5 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
            >
              View All Products
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex flex-col bg-slate-900/60 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md p-0 animate-pulse border border-white/10">
                  <div className="aspect-[3/4] bg-slate-800 w-full" />
                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="h-2.5 bg-slate-800 rounded w-16" />
                      <div className="h-2.5 bg-slate-800 rounded w-10" />
                    </div>
                    <div className="h-4 bg-slate-800 rounded w-3/4" />
                    <div className="h-4 bg-slate-800 rounded w-1/3" />
                    <div className="h-10 bg-slate-800 rounded-xl sm:rounded-2xl w-full mt-2" />
                  </div>
                </div>
              ))
            ) : productList && productList.length > 0 ? (
              productList.slice(0, 8).map((productItem) => (
                <motion.div key={productItem._id || productItem.id} variants={itemVariants}>
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full bg-slate-900/60 rounded-2xl p-12 text-center text-slate-400 border border-slate-800">
                No products available at the moment.
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* 5. Featured Promo Banner with Smooth Parallax Zoom */}
      <section className="py-14 sm:py-20 bg-slate-950">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-2xl border border-slate-800" 
              onClick={() => navigate("/shop/listing")}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
                    alt="Featured Collection" 
                    className="w-full h-[360px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 sm:p-14 space-y-4 max-w-lg">
                    <span className="w-fit bg-white/20 text-white backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider">
                        Exclusive Release
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
                        Timeless Aesthetics & Modern Essentials
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed">
                        Upgrade your wardrobe with tailored silhouettes, premium fabrics, and understated luxury.
                    </p>
                    <Button className="w-fit bg-white text-slate-950 hover:bg-slate-200 font-bold px-7 py-3 rounded-xl text-xs tracking-wider transition-all mt-2">
                        Explore Collection
                    </Button>
                </div>
            </motion.div>
        </div>
      </section>

      {/* 6. Shop by Brand Section */}
      <section className="py-14 sm:py-20 bg-slate-900/40 border-t border-slate-900">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
              Shop by Brand
            </h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Authentic collections from world-renowned fashion and sportswear labels.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {brandsWithIcon.map((brandItem) => (
              <motion.div
                key={brandItem.id}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer group bg-slate-900/70 hover:bg-white transition-all duration-300 p-6 sm:p-8 rounded-2xl flex flex-col items-center justify-center border border-slate-800 hover:border-white shadow-md text-center"
              >
                <span className="font-extrabold text-base sm:text-lg text-white group-hover:text-slate-950 transition-colors">
                  {brandItem.label}
                </span>
                <span className="text-[11px] text-slate-400 group-hover:text-slate-700 mt-1 transition-colors font-medium">
                  View Collection
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. Style Journal / Blog Section */}
      <section className="py-14 sm:py-20 bg-slate-950 border-t border-slate-900">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4"
          >
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                Style Journal
              </h2>
              <p className="text-sm text-slate-400">
                Trends, styling advice, and seasonal lookbooks.
              </p>
            </div>
            <Button 
              variant="link" 
              className="text-slate-200 hover:text-white font-bold flex items-center gap-1.5 p-0 text-sm"
              onClick={() => toast({ title: "Style Journal coming soon", description: "Stay tuned for fresh fashion editorials." })}
            >
              Read All Articles <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {[
              {
                title: "The Essential Guide to Layering for Autumn",
                category: "Style Guide",
                image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
              },
              {
                title: "Sustainable Fashion & Conscious Wardrobe Choices",
                category: "Sustainability",
                image: "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?q=80&w=1000&auto=format&fit=crop",
              },
              {
                title: "How to Build a Capsule Wardrobe with Versatile Classics",
                category: "Trends",
                image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop",
              }
            ].map((article, i) => (
              <motion.div key={i} variants={itemVariants} className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl mb-4 relative aspect-[16/10] border border-slate-800">
                  <img 
                    src={article.image} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt={article.title} 
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-700 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md">
                    {article.category}
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-slate-300 transition-colors">
                  {article.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. Newsletter Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="py-14 sm:py-20 bg-black text-white border-t border-slate-900"
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="max-w-xl mx-auto text-center space-y-4">
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                    Get 20% Off Your First Order
                </h2>
                <p className="text-slate-400 text-sm font-normal">
                    Subscribe to receive product updates, exclusive deals, and seasonal style drops directly to your inbox.
                </p>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast({ title: "Subscribed successfully!", description: "Welcome to the Veloura community." });
                  }} 
                  className="flex flex-col sm:flex-row gap-2.5 pt-4"
                >
                    <input 
                        type="email" 
                        required
                        placeholder="Enter your email address" 
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white text-sm"
                    />
                    <Button type="submit" className="bg-white text-slate-950 hover:bg-slate-200 font-bold px-6 py-3 rounded-xl text-sm transition-colors">
                        Subscribe
                    </Button>
                </form>
            </div>
        </div>
      </motion.section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;