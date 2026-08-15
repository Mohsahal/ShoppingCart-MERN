import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./loader";

function RouteTransitionLoader() {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // When the location changes, set navigating to true
    setIsNavigating(true);

    // Hide the loader after a short delay to simulate transition and allow page content to load
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 600); // 600ms loading screen

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  if (!isNavigating) return null;

  return <Loader />;
}

export default RouteTransitionLoader;
