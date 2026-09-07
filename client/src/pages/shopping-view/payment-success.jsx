import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-100">
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-slate-800 p-10 md:p-16 max-w-2xl w-full text-center space-y-8 relative overflow-hidden">
            {/* Background ambient glows */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl mb-6 shadow-inner">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                
                <div className="space-y-3">
                    <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full px-4 py-1 font-bold text-[10px] uppercase tracking-widest">
                      Transaction Verified
                    </Badge>
                    <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none">
                      ORDER <span className="text-emerald-400 italic">SECURED</span>
                    </h1>
                    <p className="text-slate-300 font-normal text-sm sm:text-base leading-relaxed max-w-md mx-auto pt-1">
                      Your payment was processed successfully. Our atelier team is now carefully packaging your luxury pieces for dispatch.
                    </p>
                </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                    className="w-full sm:w-auto px-8 py-6 rounded-2xl font-bold text-sm tracking-wider uppercase bg-white hover:bg-slate-200 text-slate-950 shadow-xl transition-all flex items-center justify-center gap-2.5"
                    onClick={() => navigate("/shop/account")}
                >
                    <ShoppingBag size={18} />
                    View Orders
                </Button>
                <Button 
                    variant="outline"
                    className="w-full sm:w-auto px-8 py-6 rounded-2xl font-bold text-sm tracking-wider uppercase border-slate-700 bg-slate-800/80 text-white hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-2.5"
                    onClick={() => navigate("/shop/home")}
                >
                    Continue Browsing
                    <ArrowRight size={18} />
                </Button>
            </div>
            
            <div className="pt-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em]">
                Confirmation receipt dispatched to your digital inbox
            </div>
        </div>
    </div>
  );
}

export default PaymentSuccessPage;

