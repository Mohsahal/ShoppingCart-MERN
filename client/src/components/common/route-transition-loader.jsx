import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Loader from "./loader";

function RouteTransitionLoader() {
  const location = useLocation();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Show loader on route change
    setShouldRender(true);
    
    // Auto-hide after 800ms
    const timer = setTimeout(() => {
      setShouldRender(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  return (
    <AnimatePresence>
      {shouldRender && <Loader key="route-loader" />}
    </AnimatePresence>
  );
}

export default RouteTransitionLoader;
