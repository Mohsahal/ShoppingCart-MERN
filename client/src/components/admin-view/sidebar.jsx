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
            className={`flex cursor-pointer font-medium items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
              isActive 
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
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
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex flex-col h-full bg-white">
            <SheetHeader className="p-6 border-b">
              <SheetTitle className="flex items-center gap-3">
                <div className="bg-primary p-2 rounded-lg">
                  <ChartNoAxesCombined className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900">Admin Portal</h1>
              </SheetTitle>
            </SheetHeader>
            <div className="px-4">
              <MenuItems setOpen={setOpen} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-72 flex-col border-r bg-white lg:flex shadow-sm">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-3 p-8 border-b transition-colors hover:bg-slate-50"
        >
          <div className="bg-primary p-2 rounded-lg">
            <ChartNoAxesCombined className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Admin Portal</h1>
        </div>
        <div className="px-4 flex-1">
          <MenuItems />
        </div>
        <div className="p-6 border-t mt-auto">
          <div className="bg-slate-50 p-4 rounded-xl">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Support</p>
            <p className="text-sm text-slate-600">Need help with the portal? Contact the dev team.</p>
          </div>
        </div>
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
