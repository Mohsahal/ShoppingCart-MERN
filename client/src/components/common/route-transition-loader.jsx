import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function RouteTransitionLoader() {
  const location = useLocation();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Show sleek top progress bar on route change
    setShouldRender(true);
    
    // Auto-hide after 500ms
    const timer = setTimeout(() => {
      setShouldRender(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          key="route-progress-bar"
          initial={{ width: "0%", opacity: 1 }}
          animate={{ width: "100%", opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 h-1 bg-white z-[100000] shadow-[0_0_15px_rgba(255,255,255,0.8)]"
        />
      )}
    </AnimatePresence>
  );
}

export default RouteTransitionLoader;
