import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { ShoppingCart, Eye, Star } from "lucide-react";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="relative w-full overflow-hidden rounded-2xl border-none bg-white shadow-sm transition-all duration-500 group hover:shadow-xl">
      <div onClick={() => handleGetProductDetails(product?._id)} className="cursor-pointer">
        <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
             <div className="scale-90 rounded-full bg-white/90 p-2 shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-100">
                <Eye className="w-4 h-4 text-slate-900" />
             </div>
          </div>

          {/* Badges */}
          <div className="absolute left-2.5 top-2.5 flex flex-col gap-1">
            {product?.totalStock === 0 ? (
                <Badge className="border-none bg-rose-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-md">
                Sold Out
                </Badge>
            ) : product?.totalStock < 10 ? (
                <Badge className="border-none bg-orange-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-md">
                Only {product?.totalStock} Left
                </Badge>
            ) : product?.salePrice > 0 ? (
                <Badge className="border-none bg-primary px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-md">
                Sale
                </Badge>
            ) : null}
          </div>
          
          {/* Rating Badge */}
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/90 px-2 py-1 shadow-sm backdrop-blur-md">
             <Star className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
             <span className="text-[10px] font-black text-slate-800">{product?.averageReview || "4.5"}</span>
          </div>
        </div>

        <CardContent className="p-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[9px] font-black text-primary uppercase tracking-widest">
               {brandOptionsMap[product?.brand]}
            </span>
          </div>

          <h2 className="mb-1.5 truncate text-sm font-black tracking-tight text-slate-900 transition-colors group-hover:text-primary sm:text-base">
            {product?.title}
          </h2>

          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black tracking-tighter text-slate-900 sm:text-xl">
              ${product?.salePrice > 0 ? product?.salePrice : product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-xs font-bold text-slate-400 line-through">
                ${product?.price}
              </span>
            )}
          </div>
        </CardContent>
      </div>

      <CardFooter className="p-3.5 pt-0">
        {product?.totalStock === 0 ? (
          <Button className="w-full cursor-not-allowed rounded-xl border-none bg-slate-100 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 shadow-none">
            Sold Out
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="flex w-full items-center gap-2 rounded-xl py-4 text-[10px] font-black uppercase tracking-[0.15em] shadow-lg shadow-primary/10 transition-all duration-300 hover:shadow-primary/30 active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Bag
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
