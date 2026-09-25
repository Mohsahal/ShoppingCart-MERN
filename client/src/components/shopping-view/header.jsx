import { HousePlug, LogOut, Menu, ShoppingCart, UserCog, User, Search, ShoppingBag } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "../ui/sheet";
import { Button } from "../ui/button";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/auth-context";
import { ShoppingContext } from "@/context/shopping-context";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import UserCartWrapper from "./cart-wrapper";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  function isMenuItemActive(menuItem) {
    if (!location.pathname.includes(menuItem.path)) {
      return false;
    }
    
    if (menuItem.id === 'home' || menuItem.id === 'search') {
      return location.pathname === menuItem.path;
    }

    let currentCategory = searchParams.get("category");
    if (!currentCategory) {
      try {
        const storedFilters = JSON.parse(sessionStorage.getItem("filters"));
        if (storedFilters && storedFilters.category && storedFilters.category.length === 1) {
          currentCategory = storedFilters.category[0];
        }
      } catch (e) {}
    }

    if (menuItem.id === "products") {
      return !currentCategory;
    }

    return currentCategory === menuItem.id;
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-7 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => {
        const isActive = isMenuItemActive(menuItem);
        return (
          <Label
            onClick={() => handleNavigate(menuItem)}
            className={`text-sm font-semibold cursor-pointer transition-colors duration-200 relative py-1 ${
              isActive ? "text-bone-950 font-bold" : "text-stone-500 hover:text-bone-950"
            }`}
            key={menuItem.id}
          >
            {menuItem.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-bone-900 rounded-full" />
            )}
          </Label>
        );
      })}
    </nav>
  );
}

function HeaderRightContent() {
  const { user, isAuthenticated, logoutUser } = useContext(AuthContext);
  const { cartItems, fetchCartItems } = useContext(ShoppingContext);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
  }

  useEffect(() => {
    if (user?.id) fetchCartItems(user?.id);
  }, [user]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-6">
      <div className="flex items-center gap-4">
        {/* Search Icon */}
        <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-stone-600 hover:bg-bone-200/70 hover:text-bone-950 transition-colors"
            onClick={() => navigate("/shop/search")}
        >
            <Search className="w-5 h-5" />
            <span className="sr-only">Search</span>
        </Button>

        {/* Cart Sheet */}
        <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
            <Button
            onClick={() => setOpenCartSheet(isAuthenticated ? true : navigate('/auth/login'))}
            variant="ghost"
            size="icon"
            className="relative rounded-full text-stone-600 hover:bg-bone-200/70 hover:text-bone-950 transition-colors"
            >
            <ShoppingCart className="w-5 h-5" />
            {cartItems?.items?.length > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-bone-900 text-bone-50 text-[10px] w-5 h-5 flex items-center justify-center p-0 rounded-full border-2 border-bone-50 font-bold">
                    {cartItems?.items?.length}
                </Badge>
            )}
            <span className="sr-only">User cart</span>
            </Button>
            <UserCartWrapper
            setOpenCartSheet={setOpenCartSheet}
            cartItems={
                cartItems && cartItems.items && cartItems.items.length > 0
                ? cartItems.items
                : []
            }
            />
        </Sheet>
      </div>

      {/* User Actions */}
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer group">
               <Avatar className="h-9 w-9 border border-bone-200 group-hover:border-bone-900 transition-all duration-300">
                  <AvatarFallback className="bg-bone-100 text-bone-900 font-black text-xs">
                  {user?.userName ? user?.userName[0].toUpperCase() : <User className="w-4 h-4" />}
                  </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end" className="w-56 mt-2 p-2 rounded-2xl shadow-xl border-bone-200 bg-bone-50">
            <DropdownMenuLabel className="p-3">
              <div className="flex flex-col gap-1">
                  <p className="text-sm font-black text-bone-900 truncate">{user?.userName}</p>
                  <p className="text-[10px] text-stone-500 font-medium truncate uppercase tracking-widest">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-bone-200" />
            <DropdownMenuItem 
              onClick={() => navigate("/shop/account")}
              className="p-3 rounded-xl cursor-pointer hover:bg-bone-100 text-stone-700 transition-colors"
            >
              <UserCog className="mr-3 h-4 w-4 text-stone-500" />
              <span className="font-bold text-xs uppercase tracking-wider">Account</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-bone-200" />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="p-3 rounded-xl cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 transition-colors"
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span className="font-bold text-xs uppercase tracking-wider">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button 
          onClick={() => navigate('/auth/login')}
          className="rounded-xl bg-bone-900 text-bone-50 hover:bg-bone-800 font-semibold px-5 py-2.5 text-xs transition-colors shadow-sm"
        >
          Sign In
        </Button>
      )}
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <header className="sticky top-0 z-50 w-full bg-bone-50/95 backdrop-blur-md border-b border-bone-200">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/shop/home" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-bone-900 flex items-center justify-center text-bone-50 shadow-sm group-hover:bg-bone-800 transition-colors">
            <ShoppingBag className="h-5 w-5 text-bone-50" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-bone-900 group-hover:text-stone-700 transition-colors">
            VELOURA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {/* Mobile Navigation & Right Content */}
        <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden lg:block">
                <HeaderRightContent />
            </div>

            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden rounded-lg hover:bg-bone-200 text-stone-700">
                        <Menu className="h-5 w-5 text-stone-700" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm p-5 sm:p-6 border-l border-bone-200 bg-bone-50 shadow-2xl">
                    <div className="flex flex-col gap-6 sm:gap-8 py-6 sm:py-8">
                        <Link to="/shop/home" className="flex items-center gap-2.5">
                            <div className="h-9 w-9 rounded-xl bg-bone-900 flex items-center justify-center text-bone-50 shadow-sm">
                              <ShoppingBag className="h-5 w-5 text-bone-50" />
                            </div>
                            <span className="font-extrabold text-xl tracking-tight text-bone-900">VELOURA</span>
                        </Link>
                        <SheetClose asChild>
                          <div>
                              <MenuItems />
                          </div>
                        </SheetClose>
                        <SheetClose asChild>
                          <div className="border-t border-bone-200 pt-6 sm:pt-8">
                              <HeaderRightContent />
                          </div>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
