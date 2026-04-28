import { createContext, useState } from "react";
import axios from "axios";

export const CommonContext = createContext(null);

export default function CommonProvider({ children }) {
  const [featureImageList, setFeatureImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getFeatureImages() {
    setIsLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL || "";
    const response = await axios.get(
      `${apiUrl}/api/common/feature/get`
    );

    if (response?.data?.success) {
      setFeatureImageList(response?.data?.data);
    }
    setIsLoading(false);
    return response.data;
  }

  async function addFeatureImage(image) {
    const apiUrl = import.meta.env.VITE_API_URL || "";
    const response = await axios.post(
      `${apiUrl}/api/common/feature/add`,
      { image }
    );

    return response.data;
  }

  async function deleteFeatureImage(id) {
    const apiUrl = import.meta.env.VITE_API_URL || "";
    const response = await axios.delete(
      `${apiUrl}/api/common/feature/${id}`
    );
    return response.data;
  }

  return (
    <CommonContext.Provider
      value={{
        featureImageList,
        isLoading,
        getFeatureImages,
        addFeatureImage,
        deleteFeatureImage,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
}
