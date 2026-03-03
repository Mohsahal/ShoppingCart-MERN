import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ChevronLeftIcon,
  ChevronRightIcon,
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

// Using real icons from the client's original list but with better styling logic
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const {
    productList,
    productDetails,
    fetchAllFilteredProducts,
    fetchProductDetails,
    addToCart,
  } = useContext(ShoppingContext);
  const { featureImageList, getFeatureImages } = useContext(CommonContext);
  const { user } = useContext(AuthContext);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

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
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (featureImageList.length > 0) {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
      }
    }, 8000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    fetchAllFilteredProducts({}, "price-lowtohigh");
    getFeatureImages();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[65vh] md:h-[75vh] overflow-hidden bg-slate-900">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <div
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
                } absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out`}
              >
                <img
                  src={slide?.image}
                  className="w-full h-full object-cover opacity-60 scale-105"
                  alt={`Banner ${index}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6">
                    {/* <h1 className="text-3xl sm:text-5xl md:text-8xl font-black text-white max-w-4xl leading-[0.95] md:leading-[0.9] tracking-tighter mb-4 md:mb-8 drop-shadow-2xl">
                        ELEVATE YOUR <span className="text-primary italic">STYLE</span> GAME
                    </h1> */}
                    <p className="text-slate-300 text-sm md:text-xl max-w-2xl mb-8 md:mb-12 font-medium leading-relaxed px-4">
                        Discover the latest trends in high-end fashion and lifestyle essentials. Curated globally, delivered locally.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto px-6 sm:px-0">
                        <Button 
                            onClick={() => navigate('/shop/listing')}
                            className="bg-primary hover:bg-primary/90 text-white font-black px-8 md:px-10 py-6 md:py-8 rounded-2xl text-base md:text-lg shadow-2xl shadow-primary/20 transform hover:-translate-y-1 transition-all flex gap-3 group justify-center"
                        >
                            EXPLORE NOW
                            <ArrowRight className="group-hover:translate-x-2 transition-transform h-5 w-5 md:h-6 md:w-6" />
                        </Button>
                        <Button 
                            variant="outline"
                            onClick={() => {
                                const categorySection = document.getElementById('category-section');
                                if(categorySection) categorySection.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-black px-8 md:px-10 py-6 md:py-8 rounded-2xl text-base md:text-lg backdrop-blur-md justify-center"
                        >
                            VIEW CATEGORIES
                        </Button>
                    </div>
                </div>
              </div>
            ))
          : null}
        
        {/* Navigation Arrows - Hidden on very small screens for cleaner UI */}
        <div className="absolute bottom-12 right-6 md:right-12 hidden sm:flex gap-3 md:gap-4 z-20">
            <Button
                variant="outline"
                size="icon"
                onClick={() =>
                    setCurrentSlide(
                    (prevSlide) =>
                        (prevSlide - 1 + featureImageList.length) %
                        featureImageList.length
                    )
                }
                className="bg-white/10 hover:bg-white/30 border-white/20 text-white rounded-full w-12 h-12 md:w-14 md:h-14 backdrop-blur-md transition-all"
            >
                <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                onClick={() =>
                    setCurrentSlide(
                    (prevSlide) => (prevSlide + 1) % featureImageList.length
                    )
                }
                className="bg-primary hover:bg-primary/90 border-none text-white rounded-full w-12 h-12 md:w-14 md:h-14 shadow-xl transition-all"
            >
                <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 sm:left-12 sm:translate-x-0 flex gap-2 z-20">
            {featureImageList.map((_, index) => (
                <div 
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1 md:h-1.5 transition-all duration-500 rounded-full cursor-pointer ${
                        index === currentSlide ? "w-8 md:w-12 bg-primary" : "w-2 md:w-4 bg-white/30 hover:bg-white/50"
                    }`}
                />
            ))}
        </div>
      </div>

      {/* Trust Badges Bar */}
      <div className="bg-white border-b py-10">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {[
                    { icon: Truck, title: "Swift Global Delivery", desc: "Orders over $150" },
                    { icon: ShieldCheck, title: "Encrypted Security", desc: "100% Secure Checkout" },
                    { icon: CreditCard, title: "Flexible Payments", desc: "Buy Now Pay Later" },
                    { icon: Zap, title: "Instant Support", desc: "24/7 Premium Care" }
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                        <div className="bg-slate-50 p-2.5 sm:p-3 rounded-2xl group-hover:bg-primary/10 transition-colors shrink-0">
                            <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        </div>
                        <div>
                            <p className="font-black text-slate-900 text-[10px] sm:text-xs md:text-sm leading-none mb-1 uppercase tracking-tighter">{item.title}</p>
                            <p className="text-[10px] text-slate-500 font-medium tracking-tight leading-none">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </div>

      {/* Categories Grid */}
      <section id="category-section" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
                 <Badge className="bg-primary/10 text-primary border-none rounded-full px-4 mb-4 font-black text-[10px] uppercase tracking-widest">Collections</Badge>
                 <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">THE <span className="text-primary italic">STYLE</span> HUB</h2>
            </div>
            <p className="text-slate-500 font-medium max-w-[200px] text-xs uppercase tracking-widest leading-relaxed text-right md:block hidden">
                Browse our curated categories for a tailored experience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8 justify-items-center">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="w-full group cursor-pointer border-none shadow-md hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden bg-white"
                key={categoryItem.id}
              >
                <CardContent className="flex flex-col items-center justify-center p-8 sm:p-10 relative">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <categoryItem.icon className="w-32 h-32 grayscale" />
                  </div>
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-500 transform group-hover:rotate-6">
                      <categoryItem.icon className="w-10 h-10 sm:w-12 sm:h-12 text-slate-700 group-hover:text-primary" />
                  </div>
                  <span className="font-black text-lg sm:text-xl text-slate-900 group-hover:text-primary transition-colors tracking-tight uppercase">
                      {categoryItem.label}
                  </span>
                  <div className="mt-4 flex items-center gap-1 text-[10px] font-black text-primary uppercase translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      Explore More <ArrowRight size={12} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Products Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
                 <Badge className="bg-slate-900 text-white border-none rounded-full px-4 font-black text-[10px] uppercase tracking-widest">Direct from Vault</Badge>
                 <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter">CURATED <span className="text-primary italic">ESSENTIALS</span></h2>
                 <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm">
                    A selection of our most loved and trending pieces chosen specifically for your premium lifestyle.
                 </p>
            </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-10">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                    key={productItem._id}
                  />
                ))
              : null}
          </div>
          <div className="mt-16 text-center">
             <Button 
                onClick={() => navigate('/shop/listing')}
                variant="outline"
                className="border-slate-200 text-slate-900 font-black px-12 py-8 rounded-2xl text-lg hover:bg-slate-50 transition-all"
             >
                LOAD MORE PRODUCT
             </Button>
          </div>
        </div>
      </section>

      {/* Brands Flow Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-center gap-12">
               <div className="max-w-md">
                   <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">WORLD CLASS <span className="text-primary italic">BRANDS</span></h2>
                   <p className="text-slate-500 font-medium text-sm">Partnering with the industry giants to bring you unparalleled quality.</p>
               </div>
               <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
                {brandsWithIcon.map((brandItem) => (
                <div
                    onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                    className="cursor-pointer group bg-slate-50 hover:bg-primary transition-all duration-300 p-6 sm:p-8 rounded-2xl sm:rounded-3xl flex items-center justify-center border border-slate-100"
                    key={brandItem.id}
                >
                    <span className="font-black text-base sm:text-xl text-slate-400 group-hover:text-white transition-colors tracking-tighter uppercase grayscale group-hover:grayscale-0 italic">
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
