import ProductFilter from "@/components/shopping-view/filter";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { sortOptions } from "@/config";
import { ArrowUpDownIcon, Layers, SearchX, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ShoppingContext } from "@/context/shopping-context";
import { AuthContext } from "@/context/auth-context";
import { Badge } from "@/components/ui/badge";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
}

function ShoppingListing() {
  const {
    productList,
    productDetails,
    cartItems,
    fetchAllFilteredProducts,
    fetchProductDetails,
    addToCart,
    fetchCartItems,
    isLoading,
  } = useContext(ShoppingContext);
  const { user } = useContext(AuthContext);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const categorySearchParam = searchParams.get("category");

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  function handleGetProductDetails(getCurrentProductId) {
    fetchProductDetails(getCurrentProductId);
  }

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    if (!user) {
      navigate('/auth/login');
      return;
    }
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

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null)
      fetchAllFilteredProducts(filters, sort);
  }, [sort, filters]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="bg-slate-50">
        <div className=" mx-auto w-full px-6 py-12">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar - Hidden on mobile, shown on desktop */}
                <aside className="hidden md:block w-[280px] shrink-0">
                    <div className="sticky top-24 h-[calc(100vh-120px)]">
                        <ProductFilter filters={filters} handleFilter={handleFilter} />
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 space-y-8">
                    {/* Header Bar */}
                    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                             <div className="bg-slate-100 p-2.5 rounded-xl text-slate-800">
                                <Layers className="h-5 w-5" />
                             </div>
                             <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">All Products</h1>
                                <p className="text-xs text-slate-500 font-normal">Showing {productList?.length || 0} items</p>
                             </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="md:hidden rounded-xl border-slate-300 text-slate-700 h-10 w-10"
                                    >
                                        <Filter className="h-4 w-4" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-full max-w-[300px] p-0 border-none">
                                    <ProductFilter filters={filters} handleFilter={handleFilter} />
                                </SheetContent>
                            </Sheet>
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                    variant="outline"
                                    className="rounded-xl border-slate-300 text-slate-700 font-medium gap-2 px-4 h-10 hover:bg-slate-50 transition-all text-xs"
                                    >
                                    <ArrowUpDownIcon className="h-3.5 w-3.5 text-slate-600" />
                                    <span>Sort By</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[220px] p-2 rounded-xl border border-slate-200 shadow-xl bg-white">
                                    <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                    {sortOptions.map((sortItem) => (
                                        <DropdownMenuRadioItem
                                            value={sortItem.id}
                                            key={sortItem.id}
                                            className="p-2.5 rounded-lg cursor-pointer font-medium text-xs text-slate-700 hover:bg-slate-100 transition-all"
                                        >
                                            {sortItem.label}
                                        </DropdownMenuRadioItem>
                                    ))}
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
                        {isLoading ? (
                            Array.from({ length: 12 }).map((_, index) => (
                                <div key={index} className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm p-0 animate-pulse border border-slate-100">
                                    <div className="aspect-[4/5] bg-slate-200 w-full" />
                                    <div className="p-3.5 space-y-2.5">
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
                            productList.map((productItem) => (
                                <ShoppingProductTile
                                    key={productItem._id}
                                    handleGetProductDetails={handleGetProductDetails}
                                    product={productItem}
                                    handleAddtoCart={handleAddtoCart}
                                />
                            ))
                        ) : (
                            <div className="col-span-full bg-white rounded-3xl p-20 flex flex-col items-center justify-center text-center space-y-6 border border-slate-100 border-dashed">
                                <div className="bg-slate-50 p-6 rounded-full">
                                    <SearchX className="h-16 w-16 text-slate-300" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-slate-900">No Treasures Found</h3>
                                    <p className="text-slate-500 font-medium max-w-xs">We couldn't find any products matching your current filters. Try adjusting them!</p>
                                </div>
                                <Button 
                                    onClick={() => {
                                        setFilters({});
                                        sessionStorage.removeItem('filters');
                                    }}
                                    variant="outline" 
                                    className="rounded-2xl border-primary text-primary hover:bg-primary hover:text-white font-black px-8 h-12 transition-all"
                                >
                                    CLEAR ALL FILTERS
                                </Button>
                            </div>
                        )}
                    </div>
                </main>
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

export default ShoppingListing;
