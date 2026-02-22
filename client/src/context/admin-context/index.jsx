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
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  }

  async function fetchAllProducts() {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/products/get`,
      {
        withCredentials: true,
      }
    );

    if (response?.data?.success) {
      setProductList(response?.data?.data);
    }
    return response.data;
  }

  async function editProduct(id, formData) {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  }

  async function deleteProduct(id) {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }

  // Orders
  async function getAllOrdersForAdmin() {
    setIsLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/get`,
      {
        withCredentials: true,
      }
    );

    if (response?.data?.success) {
      setOrderList(response?.data?.data);
    }
    setIsLoading(false);
    return response.data;
  }

  async function getOrderDetailsForAdmin(id) {
    setIsLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/details/${id}`,
      {
        withCredentials: true,
      }
    );

    if (response?.data?.success) {
      setOrderDetails(response?.data?.data);
    }
    setIsLoading(false);
    return response.data;
  }

  async function updateOrderStatus(id, orderStatus) {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/update/${id}`,
      {
        orderStatus,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
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
