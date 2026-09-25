import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Shirt,
  Baby,
  Watch,
  Footprints,
  UserCircle,
  Sparkles,
} from "lucide-react";
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

function ShoppingHome() {
  const {
    productList,
    productDetails,
    fetchAllFilteredProducts,
    fetchProductDetails,
    addToCart,
    isLoading,
  } = useContext(ShoppingContext);
  const { featureImageList, getFeatureImages } = useContext(CommonContext);
  const { user } = useContext(AuthContext);

  const [currentSlide, setCurrentSlide] = useState(0);
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
      navigate('/auth/login');
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

  const toHttps = (url) => (url ? url.replace(/^http:\/\//, "https://") : url);

  const slides = featureImageList && featureImageList.length > 0 
    ? featureImageList.map(item => toHttps(item.image)) 
    : [bannerOne, bannerTwo, bannerThree];

  const mobileSlides = [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&h=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&h=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&h=1000&auto=format&fit=crop"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides]);

  useEffect(() => {
    fetchAllFilteredProducts({}, "price-lowtohigh");
    getFeatureImages();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Banner Section */}
      <section className="relative w-full h-[460px] sm:h-[560px] overflow-hidden bg-slate-900">
        {/* Desktop Images */}
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={`desktop-${index}`}
            className={`${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            } absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 ease-in-out hidden sm:block`}
            alt="Hero Banner"
          />
        ))}

        {/* Mobile Images */}
        {mobileSlides.map((slide, index) => (
          <img
            src={slide}
            key={`mobile-${index}`}
            className={`${
              index === currentSlide % mobileSlides.length ? "opacity-100 scale-100" : "opacity-0 scale-105"
            } absolute top-0 left-0 w-full h-full object-cover object-top transition-all duration-1000 ease-in-out sm:hidden`}
            alt="Hero Banner Mobile"
          />
        ))}
        
        {/* Dark Gradient Overlay & Text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 flex flex-col items-center justify-center text-center px-4">
            <Badge className="bg-white/20 backdrop-blur-md text-white border-none rounded-full px-4 py-1 font-medium text-xs tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 inline" /> New Season Collection
            </Badge>
            <h1 className="text-3xl sm:text-6xl font-extrabold text-white tracking-tight mb-4 max-w-3xl leading-tight">
                Elevate Your Everyday Style
            </h1>
            <p className="text-sm sm:text-lg text-slate-200 max-w-xl mb-8 font-normal">
                Discover curated apparel, footwear, and luxury essentials tailored for modern comfort and versatility.
            </p>
            <Button 
                onClick={() => navigate("/shop/listing")}
                className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-8 py-6 rounded-xl text-sm transition-all duration-200 shadow-xl flex items-center gap-2"
            >
                Shop Collection
                <ArrowRight className="w-4 h-4" />
            </Button>
        </div>

        {/* Slider Controls */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 backdrop-blur-md border-none hover:bg-white text-slate-900 rounded-full h-10 w-10 hidden sm:flex items-center justify-center transition-all shadow-md"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 backdrop-blur-md border-none hover:bg-white text-slate-900 rounded-full h-10 w-10 hidden sm:flex items-center justify-center transition-all shadow-md"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
                <button 
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/40'}`}
                />
            ))}
        </div>
      </section>

      {/* Trust & Service Highlights */}
      <div className="bg-slate-50 border-b border-slate-200 py-6 sm:py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On all orders over $100" },
              { icon: ShieldCheck, title: "Secure Payment", desc: "100% protected checkout" },
              { icon: RotateCcw, title: "Easy Returns", desc: "30-day money-back guarantee" },
              { icon: Headphones, title: "24/7 Support", desc: "Dedicated customer service" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3.5 p-2">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 shrink-0 text-slate-900">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shop by Category */}
      <section id="category-section" className="py-14 sm:py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
              Shop by Category
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Explore our wide selection of essentials across all styles and categories.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {categoriesWithIcon.map((categoryItem) => (
              <div
                key={categoryItem.id}
                onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                className="group cursor-pointer border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-900 transition-all duration-200 rounded-2xl bg-white p-6 flex flex-col items-center justify-center text-center"
              >
                <div className="mb-4 bg-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-200 p-4 rounded-2xl text-slate-700">
                  <categoryItem.icon className="w-7 h-7 transition-transform duration-200 group-hover:scale-110" />
                </div>
                <span className="font-semibold text-sm sm:text-base text-slate-900">
                  {categoryItem.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-14 sm:py-20 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1">
                Trending Products
              </h2>
              <p className="text-sm text-slate-500">
                Discover our top selling styles and newest arrivals.
              </p>
            </div>
            <Button 
              variant="outline"
              onClick={() => navigate("/shop/listing")}
              className="border-slate-300 text-slate-800 hover:bg-white hover:border-slate-900 font-semibold px-5 rounded-xl text-xs flex items-center gap-1.5"
            >
              View All Products
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm p-0 animate-pulse border border-slate-100">
                  <div className="aspect-[4/5] bg-slate-200 w-full" />
                  <div className="p-4 space-y-2.5">
                    <div className="flex justify-between items-center">
                      <div className="h-2.5 bg-slate-200 rounded w-12" />
                      <div className="h-2.5 bg-slate-200 rounded w-12" />
                    </div>
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-4 bg-slate-200 rounded w-1/3" />
                    <div className="h-9 bg-slate-200 rounded-xl w-full mt-2" />
                  </div>
                </div>
              ))
            ) : productList && productList.length > 0 ? (
              productList.slice(0, 8).map((productItem) => (
                <ShoppingProductTile
                  key={productItem._id || productItem.id}
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
            ) : (
              <div className="col-span-full bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200">
                No products available at the moment.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Promo Banner */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div 
              className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg" 
              onClick={() => navigate("/shop/listing")}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
                    alt="Featured Collection" 
                    className="w-full h-[360px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 sm:p-14 space-y-4 max-w-lg">
                    <Badge className="w-fit bg-white/20 text-white backdrop-blur-md border-none rounded-full px-3 py-1 text-xs font-medium">
                        Exclusive Release
                    </Badge>
                    <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
                        Timeless Aesthetics & Modern Essentials
                    </h3>
                    <p className="text-slate-200 text-sm sm:text-base font-normal leading-relaxed">
                        Upgrade your wardrobe with tailored silhouettes, premium fabrics, and understated luxury.
                    </p>
                    <Button className="w-fit bg-white text-slate-900 hover:bg-slate-100 font-semibold px-6 py-2.5 rounded-xl text-xs tracking-wider transition-all mt-2">
                        Explore Collection
                    </Button>
                </div>
            </div>
        </div>
      </section>

      {/* Shop by Brand Section */}
      <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
              Shop by Brand
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Authentic collections from world-renowned fashion and sportswear labels.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <div
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer group bg-white hover:bg-slate-900 transition-all duration-200 p-6 sm:p-8 rounded-2xl flex flex-col items-center justify-center border border-slate-200 hover:border-slate-900 shadow-sm hover:shadow-md text-center"
              >
                <span className="font-bold text-base sm:text-lg text-slate-800 group-hover:text-white transition-colors">
                  {brandItem.label}
                </span>
                <span className="text-[11px] text-slate-400 group-hover:text-slate-300 mt-1 transition-colors">
                  View Collection
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style Journal / Blog Section */}
      <section className="py-14 sm:py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1">
                Style Journal
              </h2>
              <p className="text-sm text-slate-500">
                Trends, styling advice, and seasonal lookbooks.
              </p>
            </div>
            <Button 
              variant="link" 
              className="text-slate-900 font-semibold hover:no-underline flex items-center gap-1.5 p-0 text-sm"
              onClick={() => toast({ title: "Style Journal coming soon", description: "Stay tuned for fresh fashion editorials." })}
            >
              Read All Articles <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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
              <div key={i} className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl mb-4 relative aspect-[16/10]">
                  <img 
                    src={article.image} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt={article.title} 
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-slate-800 shadow-sm">
                    {article.category}
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-slate-600 transition-colors">
                  {article.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-14 sm:py-20 bg-slate-900 text-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="max-w-xl mx-auto text-center space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
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
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white text-sm"
                    />
                    <Button type="submit" className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
                        Subscribe
                    </Button>
                </form>
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