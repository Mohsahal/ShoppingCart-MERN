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
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Immersive Header */}
      <div className="relative h-[35vh] w-full overflow-hidden bg-slate-900">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop')] bg-cover bg-center opacity-30 blur-sm scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-12">
            <div className="container mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-end justify-between gap-8">
                <div className="flex items-center gap-8">
                    <div className="relative group">
                         <div className="absolute inset-0 bg-primary blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                         <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-[2rem] bg-slate-800 border-4 border-slate-700 flex items-center justify-center text-5xl font-black text-white shadow-2xl">
                            {user?.userName?.[0].toUpperCase()}
                         </div>
                    </div>
                    <div className="space-y-2">
                         <Badge className="bg-primary/20 text-primary border-primary/30 py-1 px-4 rounded-full text-[10px] font-black tracking-[0.3em] uppercase backdrop-blur-md">
                            Verified {user?.role}
                         </Badge>
                         <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">{user?.userName}</h1>
                         <p className="text-slate-400 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                             {user?.email}
                             <span className="h-1 w-1 bg-slate-600 rounded-full" />
                             Member since 2024
                         </p>
                    </div>
                </div>
            </div>
          </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden min-h-[600px]">
          <Tabs defaultValue="orders" className="flex flex-col h-full">
            <div className="px-10 pt-10 border-b border-slate-50">
                <TabsList className="bg-slate-100/50 p-1.5 rounded-2xl w-full max-w-md h-auto grid grid-cols-2">
                    <TabsTrigger 
                        value="orders" 
                        className="rounded-xl py-3 font-black text-xs uppercase tracking-widest gap-2 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-primary transition-all"
                    >
                        <Package size={16} />
                        My Orders
                    </TabsTrigger>
                    <TabsTrigger 
                        value="address" 
                        className="rounded-xl py-3 font-black text-xs uppercase tracking-widest gap-2 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-primary transition-all"
                    >
                        <MapPin size={16} />
                        Destinations
                    </TabsTrigger>
                </TabsList>
            </div>
            
            <div className="p-10 flex-1">
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
