import { createContext, useState } from "react";
import axios from "axios";

export const CommonContext = createContext(null);

export default function CommonProvider({ children }) {
  const [featureImageList, setFeatureImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getFeatureImages() {
    setIsLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/common/feature/get`
    );

    if (response?.data?.success) {
      setFeatureImageList(response?.data?.data);
    }
    setIsLoading(false);
    return response.data;
  }

  async function addFeatureImage(image) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/common/feature/add`,
      { image }
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
      }}
    >
      {children}
    </CommonContext.Provider>
  );
}
