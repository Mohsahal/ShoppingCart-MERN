import { Skeleton } from "../ui/skeleton";

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white/60 fixed top-0 left-0 z-50">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Loader;
