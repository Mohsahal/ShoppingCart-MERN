import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { ShoppingBag, Eye, Star, Sparkles } from "lucide-react";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const isOutOfStock = product?.totalStock === 0;
  const isLowStock = product?.totalStock > 0 && product?.totalStock < 10;
  const isOnSale = product?.salePrice > 0 && product?.salePrice < product?.price;
  const discountPercent = isOnSale
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col justify-between w-full h-full rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(255,255,255,0.06)] hover:border-white/25 transition-all duration-500 overflow-hidden select-none">
      {/* Clickable Area for Details */}
      <div 
        onClick={() => handleGetProductDetails(product?._id)} 
        className="cursor-pointer flex-1 flex flex-col"
      >
        {/* Luxury Image Showcase */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {isOutOfStock ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-600 text-white shadow-lg backdrop-blur-md">
                Sold Out
              </span>
            ) : isOnSale ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-lg backdrop-blur-md">
                <Sparkles className="w-2.5 h-2.5" />
                {discountPercent}% OFF
              </span>
            ) : null}

            {isLowStock && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-black/60 text-amber-300 border border-amber-400/30 backdrop-blur-md">
                Only {product?.totalStock} left
              </span>
            )}
          </div>

          {/* Top Right Quick View Floating Icon */}
          <div className="absolute top-3 right-3 z-10">
            <div className="w-8 h-8 rounded-full bg-slate-950/70 border border-white/20 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-md">
              <Eye className="w-4 h-4" />
            </div>
          </div>

          {/* Bottom Floating Meta Pill on Image */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/70 border border-white/15 text-slate-200 backdrop-blur-md">
              {categoryOptionsMap[product?.category] || product?.category}
            </span>
            
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/70 border border-white/15 text-slate-200 backdrop-blur-md">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-[10px] font-bold">{product?.averageReview || "4.9"}</span>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase text-amber-300/90 mb-1">
              {brandOptionsMap[product?.brand] || product?.brand || "VELOURA"}
            </p>

            <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1 group-hover:text-slate-200 transition-colors mb-2">
              {product?.title}
            </h3>

            {product?.description && (
              <p className="text-xs text-slate-400 line-clamp-1 font-normal mb-3">
                {product?.description}
              </p>
            )}
          </div>

          {/* Price Layout */}
          <div className="flex items-baseline gap-2 pt-1 border-t border-white/5 mt-auto">
            <span className="text-lg sm:text-xl font-black text-white tracking-tight">
              ${isOnSale ? product?.salePrice : product?.price}
            </span>
            {isOnSale && (
              <span className="text-xs sm:text-sm font-normal text-slate-500 line-through">
                ${product?.price}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Modern Add to Bag Action Footer */}
      <div className="p-4 sm:p-5 pt-0">
        {isOutOfStock ? (
          <Button 
            disabled 
            className="w-full rounded-xl sm:rounded-2xl bg-slate-800/60 border border-slate-700/60 py-3 text-xs font-semibold text-slate-500 shadow-none h-10"
          >
            Out of Stock
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleAddtoCart(product?._id, product?.totalStock);
            }}
            className="w-full flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-extrabold py-3 text-xs tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-white/10 active:scale-[0.98] h-10"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Bag
          </Button>
        )}
      </div>
    </div>
  );
}

export default ShoppingProductTile;
