import { createContext, useState } from "react";
import axios from "axios";

export const AdminContext = createContext(null);

export default function AdminProvider({ children }) {
  const [productList, setProductList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Products
  async function addNewProduct(formData) {
    setIsLoading(true);
    const baseUrl = import.meta.env.VITE_API_URL || "";
    const sanitizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    try {
      const response = await axios.post(
        `${sanitizedBase}/api/admin/products/add`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (e) {
      console.error("Error adding new product:", e);
      return { success: false, message: e.message };
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchAllProducts() {
    setIsLoading(true);
    const baseUrl = import.meta.env.VITE_API_URL || "";
    const sanitizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    try {
      const response = await axios.get(
        `${sanitizedBase}/api/admin/products/get`,
        {
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        setProductList(response?.data?.data);
      }
      return response.data;
    } catch (e) {
      console.error("Error fetching admin products:", e);
      return { success: false, message: e.message };
    } finally {
      setIsLoading(false);
    }
  }

  async function editProduct(id, formData) {
    setIsLoading(true);
    const baseUrl = import.meta.env.VITE_API_URL || "";
    const sanitizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    try {
      const response = await axios.put(
        `${sanitizedBase}/api/admin/products/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (e) {
      console.error("Error editing product:", e);
      return { success: false, message: e.message };
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteProduct(id) {
    setIsLoading(true);
    const baseUrl = import.meta.env.VITE_API_URL || "";
    const sanitizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    try {
      const response = await axios.delete(
        `${sanitizedBase}/api/admin/products/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (e) {
      console.error("Error deleting product:", e);
      return { success: false, message: e.message };
    } finally {
      setIsLoading(false);
    }
  }

  // Orders
  async function getAllOrdersForAdmin() {
    setIsLoading(true);
    const baseUrl = import.meta.env.VITE_API_URL || "";
    // Remove trailing slash if present to avoid // issues
    const sanitizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const url = `${sanitizedBase}/api/admin/orders/get`;

    try {
      const response = await axios.get(url, {
        withCredentials: true,
      });

      if (response?.data?.success) {
        setOrderList(response?.data?.data);
      }
      return response.data;
    } catch (e) {
      if (e.response?.status === 404) {
        console.error(`404 Error: The admin orders endpoint was not found at ${url}.`);
      } else {
        console.error("Error fetching admin orders:", e);
      }
      return { success: false, message: e.message };
    } finally {
      setIsLoading(false);
    }
  }

  async function getOrderDetailsForAdmin(id) {
    setIsLoading(true);
    const baseUrl = import.meta.env.VITE_API_URL || "";
    const sanitizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    try {
      const response = await axios.get(
        `${sanitizedBase}/api/admin/orders/details/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        setOrderDetails(response?.data?.data);
      }
      return response.data;
    } catch (e) {
      console.error("Error fetching admin order details:", e);
      return { success: false, message: e.message };
    } finally {
      setIsLoading(false);
    }
  }

  async function updateOrderStatus(id, orderStatus) {
    setIsLoading(true);
    const baseUrl = import.meta.env.VITE_API_URL || "";
    const sanitizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    try {
      const response = await axios.put(
        `${sanitizedBase}/api/admin/orders/update/${id}`,
        {
          orderStatus,
        },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (e) {
      console.error("Error updating order status:", e);
      return { success: false, message: e.message };
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AdminContext.Provider
      value={{
        productList,
        orderList,
        orderDetails,
        setOrderDetails,
        isLoading,
        addNewProduct,
        fetchAllProducts,
        editProduct,
        deleteProduct,
        getAllOrdersForAdmin,
        getOrderDetailsForAdmin,
        updateOrderStatus,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
