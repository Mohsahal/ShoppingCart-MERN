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

function ShoppingListing() {
  const {
    productList,
    productDetails,
    fetchAllFilteredProducts,
    fetchProductDetails,
    addToCart,
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
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters !== null && sort !== null)
      fetchAllFilteredProducts(filters, sort);
  }, [sort, filters]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
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
                    <div className="bg-slate-900/80 p-5 sm:p-6 rounded-2xl shadow-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                             <div className="bg-slate-800 p-2.5 rounded-xl text-white">
                                <Layers className="h-5 w-5" />
                             </div>
                             <div>
                                <h1 className="text-xl sm:text-2xl font-extrabold text-white">All Products</h1>
                                <p className="text-xs text-slate-400 font-normal">Showing {productList?.length || 0} items</p>
                             </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="md:hidden rounded-xl border-slate-700 bg-slate-800 text-white h-10 w-10 hover:bg-slate-700"
                                    >
                                        <Filter className="h-4 w-4" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-full max-w-[300px] p-0 border-none bg-slate-950">
                                    <ProductFilter filters={filters} handleFilter={handleFilter} />
                                </SheetContent>
                            </Sheet>
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                    variant="outline"
                                    className="rounded-xl border-slate-700 bg-slate-800 text-white font-semibold gap-2 px-4 h-10 hover:bg-slate-700 transition-all text-xs"
                                    >
                                    <ArrowUpDownIcon className="h-3.5 w-3.5 text-slate-300" />
                                    <span>Sort By</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[220px] p-2 rounded-xl border border-slate-800 shadow-2xl bg-slate-900 text-white">
                                    <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                    {sortOptions.map((sortItem) => (
                                        <DropdownMenuRadioItem
                                            value={sortItem.id}
                                            key={sortItem.id}
                                            className="p-2.5 rounded-lg cursor-pointer font-medium text-xs text-slate-200 hover:bg-slate-800 hover:text-white transition-all"
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
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
                        {isLoading ? (
                            Array.from({ length: 10 }).map((_, index) => (
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
                            productList.map((productItem) => (
                                <ShoppingProductTile
                                    key={productItem._id}
                                    handleGetProductDetails={handleGetProductDetails}
                                    product={productItem}
                                    handleAddtoCart={handleAddtoCart}
                                />
                            ))
                        ) : (
                            <div className="col-span-full bg-slate-900/60 rounded-3xl p-20 flex flex-col items-center justify-center text-center space-y-6 border border-slate-800 border-dashed">
                                <div className="bg-slate-800 p-6 rounded-full">
                                    <SearchX className="h-16 w-16 text-slate-400" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-white">No Products Found</h3>
                                    <p className="text-slate-400 font-normal max-w-xs">We couldn't find any products matching your current filters. Try adjusting them!</p>
                                </div>
                                <Button 
                                    onClick={() => {
                                        setFilters({});
                                        sessionStorage.removeItem('filters');
                                    }}
                                    variant="outline" 
                                    className="rounded-2xl border-white bg-white text-slate-950 hover:bg-slate-200 font-bold px-8 h-12 transition-all"
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
