import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
  Image,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket className="h-5 w-5" />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    id: "features",
    label: "Banners",
    path: "/admin/features",
    icon: <Image className="h-5 w-5" />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => {
        const isActive = location.pathname === menuItem.path;
        return (
          <div
            key={menuItem.id}
            onClick={() => {
              navigate(menuItem.path);
              setOpen ? setOpen(false) : null;
            }}
            className={`flex cursor-pointer font-bold items-center gap-3 rounded-xl px-4 py-3 text-xs tracking-wider uppercase transition-all duration-200 ${
              isActive 
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/10" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {menuItem.icon}
            <span>{menuItem.label}</span>
          </div>
        );
      })}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 p-0 border-r border-slate-200 bg-white text-slate-900">
          <div className="flex flex-col h-full bg-white">
            <SheetHeader className="p-6 border-b border-slate-200">
              <SheetTitle className="flex items-center gap-3">
                <div className="bg-slate-900 text-white p-2 rounded-xl">
                  <ChartNoAxesCombined className="h-5 w-5" />
                </div>
                <h1 className="text-lg font-black tracking-widest text-slate-900 uppercase">VELOURA ADMIN</h1>
              </SheetTitle>
            </SheetHeader>
            <div className="px-4">
              <MenuItems setOpen={setOpen} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white lg:flex shadow-sm">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-3 p-6 border-b border-slate-200 transition-colors hover:bg-slate-50"
        >
          <div className="bg-slate-900 text-white p-2 rounded-xl">
            <ChartNoAxesCombined className="h-5 w-5" />
          </div>
          <h1 className="text-lg font-black tracking-widest text-slate-900 uppercase">VELOURA ADMIN</h1>
        </div>
        <div className="px-4 flex-1">
          <MenuItems />
        </div>
        <div className="p-6 border-t border-slate-200 mt-auto">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Administrative Node</p>
            <p className="text-xs text-slate-600">All systems running normally.</p>
          </div>
        </div>
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;


