import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function ShoppingFooter() {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/shop/home" className="flex items-center gap-2">
               <span className="text-2xl font-black tracking-tighter uppercase italic">
                Veloura
               </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Redefining your style with curated collections that blend comfort, elegance, and modern trends.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                    key={i} 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-primary transition-colors group"
                >
                  <Icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-primary">Quick Links</h4>
            <ul className="space-y-4">
              {["About Us", "Contact", "Store Locator", "Careers", "Sustainability"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-slate-400 hover:text-white text-sm transition-colors flex items-center group">
                    <ArrowRight className="w-0 h-4 group-hover:w-4 transition-all opacity-0 group-hover:opacity-100 mr-0 group-hover:mr-2 text-primary" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-primary">Customer Care</h4>
            <ul className="space-y-4">
              {["Size Guide", "Shipping Policy", "Returns & Exchanges", "Order Tracking", "FAQ"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-slate-400 hover:text-white text-sm transition-colors flex items-center group">
                    <ArrowRight className="w-0 h-4 group-hover:w-4 transition-all opacity-0 group-hover:opacity-100 mr-0 group-hover:mr-2 text-primary" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-primary">Get In Touch</h4>
            <div className="space-y-4">
               <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <p className="text-slate-400 text-sm">123 Fashion Street, Style District, NY 10001</p>
               </div>
               <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <p className="text-slate-400 text-sm">+1 (555) 000-1234</p>
               </div>
               <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <p className="text-slate-400 text-sm">hello@veloura.com</p>
               </div>
            </div>
          </div>
        </div>

        {/* Newsletter & Bottom Bar */}
        <div className="border-t border-neutral-800 pt-10 mt-10">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                <div className="text-center lg:text-left">
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">
                        © 2024 Veloura. All rights reserved.
                    </p>
                </div>
                <div className="flex items-center gap-8">
                    <Link to="#" className="text-slate-500 hover:text-white text-[10px] uppercase font-bold tracking-tighter transition-colors">Privacy Policy</Link>
                    <Link to="#" className="text-slate-500 hover:text-white text-[10px] uppercase font-bold tracking-tighter transition-colors">Terms of Service</Link>
                    <Link to="#" className="text-slate-500 hover:text-white text-[10px] uppercase font-bold tracking-tighter transition-colors">Cookies</Link>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
}

export default ShoppingFooter;