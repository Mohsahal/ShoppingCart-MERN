import { createContext, useState } from "react";
import axios from "axios";

export const ShoppingContext = createContext(null);

export default function ShoppingProvider({ children }) {
  const [productList, setProductList] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [approvalURL, setApprovalURL] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Products
  async function fetchAllFilteredProducts(filterParams, sortParams) {
    setIsLoading(true);
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`
    );

    if (result?.data?.success) {
      setProductList(result?.data?.data);
    }
    setIsLoading(false);
    return result?.data;
  }

  async function fetchProductDetails(id) {
    setIsLoading(true);
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`
    );

    if (result?.data?.success) {
      setProductDetails(result?.data?.data);
    }
    setIsLoading(false);
    return result?.data;
  }

  // Cart
  async function addToCart(userId, productId, quantity) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/add`,
      { userId, productId, quantity }
    );

    if (response?.data?.success) {
      fetchCartItems(userId);
    }
    return response.data;
  }

  async function fetchCartItems(userId) {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/get/${userId}`
    );

    if (response?.data?.success) {
      setCartItems(response?.data?.data);
    }
    return response.data;
  }

  async function deleteCartItem(userId, productId) {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/${userId}/${productId}`
    );

    if (response?.data?.success) {
      fetchCartItems(userId);
    }
    return response.data;
  }

  async function updateCartQuantity(userId, productId, quantity) {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/update-cart`,
      { userId, productId, quantity }
    );

    if (response?.data?.success) {
      fetchCartItems(userId);
    }
    return response.data;
  }

  // Address
  async function addNewAddress(formData) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/address/add`,
      formData
    );
    return response.data;
  }

  async function fetchAllAddresses(userId) {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`
    );
    if (response?.data?.success) {
      setAddressList(response?.data?.data);
    }
    return response.data;
  }

  async function updateAddress(userId, addressId, formData) {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/shop/address/update/${userId}/${addressId}`,
      formData
    );
    return response.data;
  }

  async function deleteAddress(userId, addressId) {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/shop/address/delete/${userId}/${addressId}`
    );
    return response.data;
  }

  // Orders
  async function createNewOrder(orderData) {
    setIsLoading(true);
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/order/create`,
      orderData
    );
    if (response?.data?.success) {
      setApprovalURL(response.data.approvalURL);
      sessionStorage.setItem(
        "currentOrderId",
        JSON.stringify(response.data.orderId)
      );
    }
    setIsLoading(false);
    return response.data;
  }

  async function capturePayment(paymentId, payerId, orderId) {
    setIsLoading(true);
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/order/capture`,
      { paymentId, payerId, orderId }
    );
    setIsLoading(false);
    return response.data;
  }

  async function getAllOrdersByUserId(userId) {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/order/list/${userId}`
      );
      if (response?.data?.success) {
        setOrderList(response?.data?.data);
      }
      return response.data;
    } catch (e) {
      console.log(e);
      setOrderList([]); // Ensure list is cleared on error
    } finally {
      setIsLoading(false);
    }
  }

  async function getOrderDetails(id) {
    setIsLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/order/details/${id}`
    );
    if (response?.data?.success) {
      setOrderDetails(response?.data?.data);
    }
    setIsLoading(false);
    return response.data;
  }

  // Search
  async function getSearchResults(keyword) {
    setIsLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/search/${keyword}`
    );
    if (response?.data?.success) {
      setSearchResults(response?.data?.data);
    }
    setIsLoading(false);
    return response.data;
  }

  // Reviews
  async function addReview(formData) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/review/add`,
      formData
    );
    return response.data;
  }

  async function getReviews(productId) {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/review/${productId}`
    );
    if (response?.data?.success) {
      setReviews(response?.data?.data);
    }
    return response.data;
  }

  return (
    <ShoppingContext.Provider
      value={{
        productList,
        productDetails,
        setProductDetails,
        cartItems,
        addressList,
        orderList,
        orderDetails,
        setOrderDetails,
        approvalURL,
        searchResults,
        setSearchResults,
        reviews,
        isLoading,
        fetchAllFilteredProducts,
        fetchProductDetails,
        addToCart,
        fetchCartItems,
        deleteCartItem,
        updateCartQuantity,
        addNewAddress,
        fetchAllAddresses,
        updateAddress,
        deleteAddress,
        createNewOrder,
        capturePayment,
        getAllOrdersByUserId,
        getOrderDetails,
        getSearchResults,
        addReview,
        getReviews,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}
