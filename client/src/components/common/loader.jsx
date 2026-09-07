import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="flex flex-col items-center justify-center h-screen w-full bg-slate-950 fixed top-0 left-0 z-[9999]"
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="h-16 w-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white shadow-2xl shadow-black/50"
        >
          <ShoppingBag className="h-8 w-8 text-white" />
        </motion.div>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-center"
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-widest text-white uppercase">
            VELOURA
          </h1>
          <p className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase mt-1">
            HAUTE COUTURE
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Loader;

