import { HousePlug, LogOut, Menu, ShoppingCart, UserCog, User, Search } from "lucide-react";
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

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-8 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className={`text-sm font-bold cursor-pointer transition-all duration-300 hover:text-primary relative group ${
            location.pathname.includes(menuItem.path) ? "text-primary" : "text-slate-600"
          }`}
          key={menuItem.id}
        >
          {menuItem.label}
          <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
            location.pathname.includes(menuItem.path) ? "w-full" : ""
          }`} />
        </Label>
      ))}
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
            className="rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
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
            className="relative rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
            >
            <ShoppingCart className="w-5 h-5" />
            {cartItems?.items?.length > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-5 h-5 flex items-center justify-center p-0 rounded-full border-2 border-white font-bold">
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
            <div className="flex items-center gap-2 cursor-pointer group">
               <Avatar className="h-10 w-10 border-2 border-slate-100 group-hover:border-primary transition-all duration-300">
                  <AvatarFallback className="bg-slate-900 text-white font-bold">
                  {user?.userName ? user?.userName[0].toUpperCase() : <User />}
                  </AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors leading-none">{user?.userName}</span>
                  <span className="text-[10px] text-slate-400 font-medium tracking-tighter uppercase">{user?.role}</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end" className="w-64 mt-2 p-2 rounded-2xl shadow-2xl border-none">
            <DropdownMenuLabel className="p-4">
              <div className="flex flex-col gap-1">
                  <p className="text-sm font-black text-slate-900">Personal Hub</p>
                  <p className="text-xs text-slate-500 font-medium truncate">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem 
              onClick={() => navigate("/shop/account")}
              className="p-3 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <UserCog className="mr-3 h-4 w-4 text-slate-400" />
              <span className="font-bold text-slate-700">Manage Account</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="p-3 rounded-xl cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 transition-colors"
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span className="font-bold">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button 
          onClick={() => navigate('/auth/login')}
          className="rounded-xl font-bold px-6"
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
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      <div className="container mx-auto max-w-7xl flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6">
        <Link to="/shop/home" className="flex items-center gap-3 group">
          <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <HousePlug className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <span className="font-black text-xl sm:text-2xl tracking-tighter text-slate-900">Veloura</span>
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
                    <Button variant="ghost" size="icon" className="lg:hidden rounded-full hover:bg-slate-100">
                        <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-slate-600" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm p-5 sm:p-6 border-none shadow-2xl">
                    <div className="flex flex-col gap-6 sm:gap-8 py-6 sm:py-8">
                        <Link to="/shop/home" className="flex items-center gap-2 sm:gap-3">
                            <div className="bg-primary p-2 rounded-xl">
                                <HousePlug className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                            </div>
                            <span className="font-black text-lg sm:text-2xl tracking-tighter">Veloura</span>
                        </Link>
                        <SheetClose asChild>
                          <div>
                              <MenuItems />
                          </div>
                        </SheetClose>
                        <SheetClose asChild>
                          <div className="border-t pt-6 sm:pt-8">
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
