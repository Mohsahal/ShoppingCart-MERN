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
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
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
    <div className="bg-white min-h-screen">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-32 space-y-24">
            
            {/* Search Input Section */}
            <div className="max-w-5xl mx-auto w-full relative">
                <Input
                    value={keyword}
                    name="keyword"
                    onChange={(event) => setKeyword(event.target.value)}
                    className="w-full h-auto border-0 border-b-[3px] border-slate-900 bg-transparent text-4xl sm:text-7xl lg:text-[7rem] font-black italic tracking-tighter text-slate-900 rounded-none px-0 py-4 sm:py-8 focus-visible:ring-0 focus-visible:border-primary placeholder:text-slate-100 transition-colors uppercase"
                    placeholder="SEARCH"
                    autoFocus
                />
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    {isLoading ? (
                        <Loader2 className="h-8 w-8 sm:h-12 sm:w-12 text-primary animate-spin" />
                    ) : (
                        <span className="text-xs sm:text-sm font-black tracking-[0.3em] uppercase text-slate-300">Type</span>
                    )}
                </div>
            </div>

            {/* Results Section */}
            <div className="space-y-16">
                <div className="flex items-end justify-between border-b border-slate-900 pb-4">
                    <h2 className="text-xl sm:text-3xl font-black tracking-tighter text-slate-900 uppercase">Archive</h2>
                    <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-slate-400 uppercase">
                        [{searchResults.length}] Matches
                    </span>
                </div>

                {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                    <div className="pt-20 text-center">
                        <p className="text-slate-300 text-2xl sm:text-4xl font-black tracking-tighter uppercase italic">
                            {keyword.length > 0 ? "Nothing Found." : "Awaiting Input."}
                        </p>
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
