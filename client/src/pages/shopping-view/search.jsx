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
      }, 500);
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
          title: "Product added to cart",
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
    <div className="bg-bone-50 min-h-screen text-stone-900">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 space-y-10">
            {/* Search Input Section */}
            <div className="max-w-2xl mx-auto space-y-6 text-center">
                 <div className="space-y-2">
                    <h1 className="text-2xl sm:text-4xl font-bold text-bone-950 tracking-tight">Search Our Products</h1>
                    <p className="text-stone-500 text-sm">Find apparel, footwear, accessories, and designer brands</p>
                 </div>
                 
                 <div className="relative group">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-stone-400 group-focus-within:text-bone-950 transition-colors" />
                    </div>
                    <Input
                        value={keyword}
                        name="keyword"
                        onChange={(event) => setKeyword(event.target.value)}
                        className="py-6 pl-14 pr-14 text-base font-normal bg-bone-50 border-bone-300 text-bone-950 rounded-2xl shadow-sm focus-visible:ring-bone-900 focus-visible:border-bone-900 transition-all placeholder:text-stone-400"
                        placeholder="Search by product name, brand, or category..."
                    />
                    <div className="absolute inset-y-0 right-5 flex items-center">
                         {isLoading ? (
                            <Loader2 className="h-5 w-5 text-stone-700 animate-spin" />
                         ) : null}
                    </div>
                 </div>
            </div>

            {/* Results Grid */}
            <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-bone-200 pb-4">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-bone-950">Search Results</span>
                        <div className="h-1 w-1 bg-bone-300 rounded-full" />
                        <span className="text-xs text-stone-500">{searchResults.length} {searchResults.length === 1 ? 'Product' : 'Products'} Found</span>
                    </div>
                </div>

                {searchResults.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
                    <div className="bg-bone-50 rounded-2xl p-16 text-center border border-bone-200 flex flex-col items-center justify-center space-y-4">
                         <div className="bg-bone-100 p-6 rounded-full text-stone-400 border border-bone-200">
                            <FilterX className="h-10 w-10" />
                         </div>
                         <div className="space-y-1">
                             <h3 className="text-lg font-bold text-bone-950">
                               {keyword.trim().length > 0 ? "No Products Found" : "Start typing to search"}
                             </h3>
                             <p className="text-stone-500 text-sm max-w-sm mx-auto">
                               {keyword.trim().length > 0
                                 ? "We couldn't find any items matching your search. Try checking the spelling or searching for another term."
                                 : "Search across our collection of men, women, kids, footwear, and accessories."}
                             </p>
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
