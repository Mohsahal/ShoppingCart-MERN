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
            className={`text-sm font-medium cursor-pointer transition-colors duration-200 relative py-1 ${
              isActive ? "text-white font-semibold" : "text-slate-400 hover:text-white"
            }`}
            key={menuItem.id}
          >
            {menuItem.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
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
      <div className="flex items-center gap-3">
        {/* Search Icon */}
        <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
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
            className="relative rounded-full text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
            <ShoppingCart className="w-5 h-5" />
            {cartItems?.items?.length > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-white text-slate-950 text-[10px] w-5 h-5 flex items-center justify-center p-0 rounded-full border-2 border-slate-950 font-black shadow-md">
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
               <Avatar className="h-9 w-9 border border-slate-700 group-hover:border-white transition-all duration-300">
                  <AvatarFallback className="bg-slate-900 text-white font-bold text-xs">
                  {user?.userName ? user?.userName[0].toUpperCase() : <User className="w-4 h-4" />}
                  </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end" className="w-56 mt-2 p-2 rounded-2xl shadow-2xl bg-slate-900 border-slate-800 text-white">
            <DropdownMenuLabel className="p-3">
              <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold text-white truncate">{user?.userName}</p>
                  <p className="text-[10px] text-slate-400 font-medium truncate uppercase tracking-widest">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem 
              onClick={() => navigate("/shop/account")}
              className="p-3 rounded-xl cursor-pointer hover:bg-slate-800 text-slate-200 hover:text-white transition-colors"
            >
              <UserCog className="mr-3 h-4 w-4 text-slate-400" />
              <span className="font-bold text-xs uppercase tracking-wider">Account</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="p-3 rounded-xl cursor-pointer text-red-400 focus:text-red-400 focus:bg-red-950/40 transition-colors"
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span className="font-bold text-xs uppercase tracking-wider">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button 
          onClick={() => navigate('/auth/login')}
          className="rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-bold px-5 py-2.5 text-xs transition-colors shadow-sm"
        >
          Sign In
        </Button>
      )}
    </div>
  );
}

function ShoppingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 text-white">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/shop/home" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-white flex items-center justify-center text-slate-950 shadow-sm group-hover:scale-105 transition-all">
            <ShoppingBag className="h-5 w-5 text-slate-950" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-slate-300 transition-colors">
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
                    <Button variant="ghost" size="icon" className="lg:hidden rounded-lg hover:bg-slate-800 text-slate-300">
                        <Menu className="h-5 w-5 text-slate-300" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm p-5 sm:p-6 bg-slate-950 border-slate-800 text-white shadow-2xl">
                    <div className="flex flex-col gap-6 sm:gap-8 py-6 sm:py-8">
                        <Link to="/shop/home" className="flex items-center gap-2.5">
                            <div className="h-9 w-9 rounded-xl bg-white flex items-center justify-center text-slate-950 shadow-sm">
                              <ShoppingBag className="h-5 w-5 text-slate-950" />
                            </div>
                            <span className="font-extrabold text-xl tracking-tight text-white">VELOURA</span>
                        </Link>
                        <SheetClose asChild>
                          <div>
                              <MenuItems />
                          </div>
                        </SheetClose>
                        <SheetClose asChild>
                          <div className="border-t border-slate-800 pt-6 sm:pt-8">
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
