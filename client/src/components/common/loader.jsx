import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="flex flex-col items-center justify-center h-screen w-full bg-white fixed top-0 left-0 z-[9999]"
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="h-14 w-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg"
        >
          <ShoppingBag className="h-7 w-7 text-white" />
        </motion.div>
        <motion.h1 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900"
        >
          VELOURA
        </motion.h1>
      </div>
    </motion.div>
  );
}

export default Loader;
