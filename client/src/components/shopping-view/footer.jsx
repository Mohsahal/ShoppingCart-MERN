import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

function ShoppingFooter() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-10 border-t border-slate-800">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/shop/home" className="flex items-center gap-2.5">
               <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-slate-900 shadow-sm">
                 <ShoppingBag className="h-4 w-4 text-slate-900" />
               </div>
               <span className="text-xl font-bold tracking-tight text-white">
                VELOURA
               </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Modern fashion essentials designed for comfort, style, and everyday confidence.
            </p>
            <div className="flex gap-3 pt-2">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                    key={i} 
                    href="#" 
                    className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-colors group"
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2.5">
              {["About Us", "Contact Us", "Store Locator", "Careers", "Sustainability"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Customer Care</h4>
            <ul className="space-y-2.5">
              {["Size Guide", "Shipping & Delivery", "Returns & Exchanges", "Order Tracking", "FAQ"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold mb-4 text-white">Contact Us</h4>
            <div className="space-y-3">
               <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-slate-400 text-sm">123 Fashion Ave, Suite 500, New York, NY</p>
               </div>
               <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <p className="text-slate-400 text-sm">+1 (800) 555-0199</p>
               </div>
               <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <p className="text-slate-400 text-sm">support@veloura.com</p>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                <p>
                    © 2026 Veloura Inc. All rights reserved.
                </p>
                <div className="flex items-center gap-6">
                    <Link to="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
                    <Link to="#" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
                    <Link to="#" className="hover:text-slate-300 transition-colors">Cookie Settings</Link>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
}

export default ShoppingFooter;