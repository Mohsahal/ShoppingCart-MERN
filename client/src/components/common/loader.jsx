import { motion } from 'framer-motion';

function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="flex flex-col items-center justify-center h-screen w-full bg-white fixed top-0 left-0 z-[9999]"
    >
      <div className="flex flex-col items-center justify-center space-y-6">
        <motion.h1 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl sm:text-4xl font-black tracking-tighter uppercase italic text-slate-900 drop-shadow-sm"
        >
          Veloura
        </motion.h1>
      </div>
    </motion.div>
  );
}

export default Loader;
