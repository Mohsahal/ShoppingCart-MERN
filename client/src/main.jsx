import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster.jsx";
import AuthProvider from "./context/auth-context/index.jsx";
import AdminProvider from "./context/admin-context/index.jsx";
import ShoppingProvider from "./context/shopping-context/index.jsx";
import CommonProvider from "./context/common-context/index.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <AdminProvider>
        <ShoppingProvider>
          <CommonProvider>
            <App />
            <Toaster />
          </CommonProvider>
        </ShoppingProvider>
      </AdminProvider>
    </AuthProvider>
  </BrowserRouter>
);
