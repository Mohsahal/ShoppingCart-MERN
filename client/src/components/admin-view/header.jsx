import { AlignJustify, LogOut, User } from "lucide-react";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";

function AdminHeader({ setOpen }) {
  const { user, logoutUser } = useContext(AuthContext);

  function handleLogout() {
    logoutUser();
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b sticky top-0 z-30 shadow-sm">
      <Button 
        onClick={() => setOpen(true)} 
        variant="ghost" 
        size="icon" 
        className="lg:hidden hover:bg-slate-100 rounded-lg"
      >
        <AlignJustify className="h-6 w-6 text-slate-600" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-4 flex-1 ml-4 lg:ml-0">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest hidden lg:block">Welcome Back,</h2>
          <h1 className="text-lg font-bold text-slate-800">{user?.userName} (Admin)</h1>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden border border-slate-200 hover:ring-2 hover:ring-primary/20 transition-all">
              <Avatar className="h-full w-full">
                <AvatarFallback className="bg-primary text-white font-bold">
                  {user?.userName?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-bold leading-none">{user?.userName}</p>
                <p className="text-xs leading-none text-slate-500">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default AdminHeader;
