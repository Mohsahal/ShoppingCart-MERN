import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-slate-50">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-12 md:p-20 max-w-2xl w-full text-center space-y-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
            
            <div className="relative">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-100 rounded-[2rem] mb-6 animate-bounce">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                </div>
                
                <div className="space-y-4">
                    <Badge className="bg-emerald-100 text-emerald-700 border-none rounded-full px-4 font-black text-[10px] uppercase tracking-widest">Transaction Verified</Badge>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">ORDER <span className="text-emerald-600 italic">SECURED</span></h1>
                    <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-sm mx-auto">
                        Your payment was processed successfully. Our logistics team is now preparing your treasures for transit.
                    </p>
                </div>
            </div>

            <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                    className="w-full sm:w-auto px-10 py-8 rounded-2xl font-black text-lg tracking-tighter uppercase shadow-xl shadow-primary/20 transform hover:-translate-y-1 transition-all flex items-center gap-3"
                    onClick={() => navigate("/shop/account")}
                >
                    <ShoppingBag size={20} />
                    View Registry
                </Button>
                <Button 
                    variant="outline"
                    className="w-full sm:w-auto px-10 py-8 rounded-2xl font-black text-lg tracking-tighter uppercase border-slate-200 text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-3"
                    onClick={() => navigate("/shop/home")}
                >
                    Continue Browsing
                    <ArrowRight size={20} />
                </Button>
            </div>
            
            <div className="pt-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                Confirmation receipt sent to your digital inbox
            </div>
        </div>
    </div>
  );
}

export default PaymentSuccessPage;
