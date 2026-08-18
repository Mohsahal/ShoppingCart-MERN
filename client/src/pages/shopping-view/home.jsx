
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
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

  // Force https:// to fix Mixed Content errors on HTTPS deployments
  // (Cloudinary may have stored http:// URLs in the DB)
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
    console.log("Current Slides Source:", featureImageList && featureImageList.length > 0 ? "Database" : "Local Assets");
  }, [featureImageList]);

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
      {/* Banner Slider Section */}
      <section className="relative w-full h-[500px] sm:h-[600px] overflow-hidden bg-slate-900">
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

        {/* Mobile Images (Portrait) */}
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
        
        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-center p-4">
            <Badge className="bg-white/20 backdrop-blur-md text-white border-none rounded-full px-6 py-1.5 font-black text-[10px] uppercase tracking-[0.4em] mb-6">
                New Arrival 2026
            </Badge>
            <h2 className="text-4xl sm:text-7xl font-black text-white tracking-tighter mb-8 max-w-4xl leading-tight">
                THE FUTURE OF <span className="italic text-primary">PREMIUM</span> FASHION
            </h2>
            <Button 
                onClick={() => navigate("/shop/listing")}
                className="bg-white text-slate-900 hover:bg-primary hover:text-white font-black px-10 py-6 rounded-2xl text-sm uppercase tracking-widest transition-all duration-300 shadow-2xl"
            >
                Explore Collection
            </Button>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + slides.length) % slides.length
            )
          }
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/50 backdrop-blur-md border-none hover:bg-white text-slate-900 rounded-full h-12 w-12 hidden sm:flex items-center justify-center transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/50 backdrop-blur-md border-none hover:bg-white text-slate-900 rounded-full h-12 w-12 hidden sm:flex items-center justify-center transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
            {slides.map((_, index) => (
                <button 
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}
                />
            ))}
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

      {/* Featured Collection Banner Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <div className="relative rounded-[2rem] overflow-hidden group cursor-pointer" onClick={() => navigate("/shop/listing")}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
                    alt="Featured" 
                    className="w-full h-[400px] sm:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 sm:p-16 space-y-6">
                    <Badge className="w-fit bg-primary text-white border-none rounded-full px-4 py-1 text-[10px] uppercase tracking-widest">
                        Limited Edition
                    </Badge>
                    <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tighter leading-tight max-w-md">
                        UNLEASH YOUR <span className="text-primary italic">SIGNATURE</span> LOOK
                    </h3>
                    <p className="text-white/70 max-w-sm text-sm sm:text-base font-medium">
                        Experience the perfect blend of comfort and avant-garde style with our latest seasonal drop.
                    </p>
                    <Button className="w-fit bg-white text-slate-900 hover:bg-primary hover:text-white font-black px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all">
                        Shop Collection
                    </Button>
                </div>
            </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-primary/5 text-primary border-none rounded-full px-4 mb-3 font-black text-[10px] uppercase tracking-widest">
              Top Picks
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter">
              TRENDING <span className="text-primary italic">NOW</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {productList && productList.length > 0
              ? productList.slice(0, 8).map((productItem) => (
                  <ShoppingProductTile
                    key={productItem._id || productItem.id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              onClick={() => navigate("/shop/listing")}
              className="bg-white text-slate-900 border-2 border-slate-200 hover:border-primary hover:bg-primary hover:text-white font-black px-8 py-6 rounded-2xl text-xs uppercase tracking-widest transition-all duration-300 shadow-sm"
            >
              View All Products
            </Button>
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

      {/* Style Journal Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <Badge className="bg-primary/5 text-primary border-none rounded-full px-4 mb-3 font-black text-[10px] uppercase tracking-widest">
                Editorial
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter">
                STYLE <span className="text-primary italic">JOURNAL</span>
              </h2>
            </div>
            <Button 
              variant="link" 
              className="text-primary font-bold hover:no-underline flex items-center gap-2 p-0"
              onClick={() => toast({ title: "Style Journal coming soon!", description: "Stay tuned for our latest fashion editorials." })}
            >
              Read All Articles <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "The Fall Collection Lookbook",
                category: "Fashion",
                image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
              },
              {
                title: "Sustainable Materials We Love",
                category: "Sustainability",
                image: "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?q=80&w=1000&auto=format&fit=crop",
              },
              {
                title: "How to Style Oversized Blazers",
                category: "Style Guide",
                image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop",
              }
            ].map((article, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="overflow-hidden rounded-3xl mb-5 relative">
                  <img src={article.image} className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-700" alt={article.title} />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                    {article.category}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors pr-4">
                  {article.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 sm:py-32 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 opacity-40">
           <div className="absolute top-0 left-0 w-96 h-96 bg-slate-100 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-100 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center space-y-8">
                <Badge className="bg-slate-100 text-slate-900 border-none rounded-full px-6 py-1.5 font-black text-[10px] uppercase tracking-[0.3em]">
                    Join the Club
                </Badge>
                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                    GET 20% OFF YOUR <span className="italic text-primary">FIRST ORDER</span>
                </h2>
                <p className="text-slate-500 font-medium text-sm sm:text-base">
                    Subscribe to receive updates, access to exclusive deals, and more.
                </p>
                <form className="flex flex-col sm:flex-row gap-3 mt-10">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 font-bold"
                    />
                    <Button className="bg-slate-900 text-white hover:bg-primary font-black px-10 py-4 rounded-2xl uppercase tracking-widest text-xs shadow-xl transition-colors">
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