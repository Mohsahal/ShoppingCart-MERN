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
    <Card className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 group hover:shadow-md hover:border-slate-300">
      <div onClick={() => handleGetProductDetails(product?._id)} className="cursor-pointer">
        <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
             <div className="scale-90 rounded-full bg-white/95 p-2.5 shadow-md backdrop-blur-md transition-transform duration-200 group-hover:scale-100">
                <Eye className="w-4 h-4 text-slate-800" />
             </div>
          </div>

          {/* Badges */}
          <div className="absolute left-2.5 top-2.5 flex flex-col gap-1">
            {product?.totalStock === 0 ? (
                <Badge className="border-none bg-rose-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                  Sold Out
                </Badge>
            ) : product?.totalStock < 10 ? (
                <Badge className="border-none bg-amber-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                  Only {product?.totalStock} Left
                </Badge>
            ) : product?.salePrice > 0 ? (
                <Badge className="border-none bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                  Sale
                </Badge>
            ) : null}
          </div>
          
          {/* Rating Badge */}
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-md border border-white/40 bg-white/90 px-1.5 py-0.5 shadow-sm backdrop-blur-md">
             <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
             <span className="text-[11px] font-semibold text-slate-800">{product?.averageReview || "4.5"}</span>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
               {brandOptionsMap[product?.brand]}
            </span>
          </div>

          <h3 className="mb-2 truncate text-sm font-semibold text-slate-800 transition-colors group-hover:text-slate-950">
            {product?.title}
          </h3>

          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-bold text-slate-900">
              ${product?.salePrice > 0 ? product?.salePrice : product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-xs font-normal text-slate-400 line-through">
                ${product?.price}
              </span>
            )}
          </div>
        </CardContent>
      </div>

      <CardFooter className="p-4 pt-0">
        {product?.totalStock === 0 ? (
          <Button disabled className="w-full rounded-xl bg-slate-100 py-2.5 text-xs font-medium text-slate-400 shadow-none">
            Sold Out
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm active:scale-98"
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
