import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";
import { Badge } from "@/components/ui/badge";
import { User, Package, MapPin, ChevronRight } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";

function ShoppingAccount() {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-20">
      {/* Immersive Header */}
      <div className="relative h-[35vh] w-full overflow-hidden bg-slate-900">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-25 blur-[2px] scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 md:gap-8">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
                    <div className="relative group">
                         <div className="absolute inset-0 bg-white blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
                         <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-3xl bg-slate-900 border-2 border-slate-700 flex items-center justify-center text-4xl md:text-5xl font-black text-white shadow-2xl">
                            {user?.userName?.[0]?.toUpperCase() || <User className="w-8 h-8" />}
                         </div>
                    </div>
                    <div className="space-y-2">
                         <Badge className="bg-white/10 text-slate-200 border-white/20 py-1 px-4 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase backdrop-blur-md inline-flex mx-auto md:mx-0">
                            Verified {user?.role || "Member"}
                         </Badge>
                         <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-none">{user?.userName}</h1>
                         <p className="text-slate-400 font-medium text-xs md:text-sm uppercase tracking-wider flex items-center justify-center md:justify-start gap-2">
                             {user?.email}
                             <span className="h-1 w-1 bg-slate-600 rounded-full hidden sm:block" />
                             <span className="hidden sm:block">Member since 2026</span>
                         </p>
                    </div>
                </div>
            </div>
          </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 -mt-8 relative z-10">
        <div className="bg-slate-900/80 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden min-h-[600px] backdrop-blur-xl">
          <Tabs defaultValue="orders" className="flex flex-col h-full">
            <div className="px-6 md:px-10 pt-6 md:pt-8 border-b border-slate-800">
                <TabsList className="bg-slate-950 p-1.5 rounded-2xl w-full max-w-sm h-auto grid grid-cols-2 border border-slate-800">
                    <TabsTrigger 
                        value="orders" 
                        className="rounded-xl py-2.5 font-bold text-xs uppercase tracking-wider gap-2 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-slate-950 text-slate-400 transition-all"
                    >
                        <Package size={16} />
                        My Orders
                    </TabsTrigger>
                    <TabsTrigger 
                        value="address" 
                        className="rounded-xl py-2.5 font-bold text-xs uppercase tracking-wider gap-2 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-slate-950 text-slate-400 transition-all"
                    >
                        <MapPin size={16} />
                        Addresses
                    </TabsTrigger>
                </TabsList>
            </div>
            
            <div className="p-6 md:p-10 flex-1">
                <TabsContent value="orders" className="m-0 focus-visible:outline-none">
                     <ShoppingOrders />
                </TabsContent>
                <TabsContent value="address" className="m-0 focus-visible:outline-none">
                     <Address />
                </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
