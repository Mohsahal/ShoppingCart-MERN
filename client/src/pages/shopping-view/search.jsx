import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ShoppingContext } from "@/context/shopping-context";
import { AuthContext } from "@/context/auth-context";
import { Search, Sparkles, FilterX, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    searchResults,
    setSearchResults,
    getSearchResults,
    productDetails,
    fetchProductDetails,
    addToCart,
    cartItems,
    isLoading
  } = useContext(ShoppingContext);

  const { user } = useContext(AuthContext);
  const { toast } = useToast();

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 2) {
      const timeoutId = setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        getSearchResults(keyword);
      }, 1000);
      return () => clearTimeout(timeoutId);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      setSearchResults([]);
    }
  }, [keyword]);

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }

    addToCart(user?.id, getCurrentProductId, 1).then((data) => {
      if (data?.success) {
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleGetProductDetails(getCurrentProductId) {
    fetchProductDetails(getCurrentProductId);
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="bg-slate-50 min-h-screen">
        <div className="container mx-auto max-w-7xl px-6 py-16 space-y-12">
            {/* Search Input Section */}
            <div className="max-w-3xl mx-auto space-y-8 text-center">
                 <div className="space-y-4">
                    <Badge className="bg-primary/10 text-primary border-none rounded-full px-4 font-black text-[10px] uppercase tracking-widest">Global Index Search</Badge>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">FIND YOUR <span className="text-primary italic">SIGNATURE</span></h1>
                    <p className="text-slate-500 font-medium text-sm uppercase tracking-widest">Access our complete vault of premium inventory</p>
                 </div>
                 
                 <div className="relative group">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <Search className="h-6 w-6 text-slate-400 group-focus-within:text-primary transition-colors" />
                    </div>
                    <Input
                        value={keyword}
                        name="keyword"
                        onChange={(event) => setKeyword(event.target.value)}
                        className="py-10 pl-16 pr-20 text-xl font-bold bg-white border-slate-200 rounded-[2.5rem] shadow-xl shadow-slate-200/50 focus-visible:ring-primary focus-visible:border-primary transition-all placeholder:text-slate-300"
                        placeholder="Type to search treasures..."
                    />
                    <div className="absolute inset-y-0 right-6 flex items-center">
                         {isLoading ? (
                            <Loader2 className="h-6 w-6 text-primary animate-spin" />
                         ) : (
                            <Sparkles className="h-6 w-6 text-slate-200" />
                         )}
                    </div>
                 </div>
            </div>

            {/* Results Grid */}
            <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Index Results</span>
                        <div className="h-1 w-1 bg-slate-200 rounded-full" />
                        <span className="text-sm font-bold text-slate-400">{searchResults.length} Matches Found</span>
                    </div>
                    {searchResults.length > 0 && (
                         <Badge className="bg-slate-900 text-white rounded-full px-3 py-1 font-bold text-[10px] tracking-tighter">LIVE FEED</Badge>
                    )}
                </div>

                {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {searchResults.map((item) => (
                        <ShoppingProductTile
                            key={item._id}
                            handleAddtoCart={handleAddtoCart}
                            product={item}
                            handleGetProductDetails={handleGetProductDetails}
                        />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[3rem] p-24 text-center border border-slate-100 flex flex-col items-center justify-center space-y-6">
                         <div className="bg-slate-50 p-8 rounded-full">
                            <FilterX className="h-16 w-16 text-slate-200" />
                         </div>
                         <div className="space-y-2">
                             <h3 className="text-3xl font-black text-slate-900 tracking-tight">No Matches in the Vault</h3>
                             <p className="text-slate-500 font-medium max-w-sm mx-auto">We couldn't find any products matching your specific query. Try a different keyword or browse our collections!</p>
                         </div>
                    </div>
                )}
            </div>
        </div>

        <ProductDetailsDialog
            open={openDetailsDialog}
            setOpen={setOpenDetailsDialog}
            productDetails={productDetails}
        />
    </div>
  );
}

export default SearchProducts;
