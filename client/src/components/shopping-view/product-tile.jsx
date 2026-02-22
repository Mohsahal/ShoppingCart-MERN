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
    <Card className="w-full group overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[1.5rem] bg-white relative">
      <div onClick={() => handleGetProductDetails(product?._id)} className="cursor-pointer">
        <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
             <div className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-xl scale-90 group-hover:scale-100 transition-transform duration-300">
                <Eye className="w-3.5 h-3.5 text-slate-900" />
             </div>
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product?.totalStock === 0 ? (
                <Badge className="bg-rose-500 text-white border-none shadow-md px-1.5 py-0.5 font-bold text-[8px] uppercase tracking-wider">
                Sold Out
                </Badge>
            ) : product?.totalStock < 10 ? (
                <Badge className="bg-orange-500 text-white border-none shadow-md px-1.5 py-0.5 font-bold text-[8px] uppercase tracking-wider">
                Limit: {product?.totalStock}
                </Badge>
            ) : product?.salePrice > 0 ? (
                <Badge className="bg-primary text-white border-none shadow-md px-1.5 py-0.5 font-bold text-[8px] uppercase tracking-wider">
                Sale
                </Badge>
            ) : null}
          </div>
          
          {/* Rating Badge */}
          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-md px-1 py-0.5 rounded-lg flex items-center gap-1 shadow-sm border border-white/20">
             <Star className="w-2 h-2 text-yellow-500 fill-yellow-500" />
             <span className="text-[8px] font-black text-slate-800">{product?.averageReview || "4.5"}</span>
          </div>
        </div>

        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[8px] font-black text-slate-400 continental uppercase tracking-[0.1em]">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[8px] font-black text-primary uppercase tracking-wider">
               {brandOptionsMap[product?.brand]}
            </span>
          </div>

          <h2 className="text-sm font-black text-slate-900 mb-1 truncate group-hover:text-primary transition-colors tracking-tight">
            {product?.title}
          </h2>

          <div className="flex items-baseline gap-1">
            <span className={`text-lg font-black text-slate-900 tracking-tighter`}>
              ${product?.salePrice > 0 ? product?.salePrice : product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-[10px] font-bold text-slate-400 line-through">
                ${product?.price}
              </span>
            )}
          </div>
        </CardContent>
      </div>

      <CardFooter className="p-3 pt-0">
        {product?.totalStock === 0 ? (
          <Button className="w-full py-3 rounded-xl bg-slate-50 text-slate-300 cursor-not-allowed border-none shadow-none font-bold uppercase tracking-widest text-[9px]">
            Sold Out
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full py-4 rounded-xl font-black uppercase tracking-[0.1em] text-[9px] flex items-center gap-1.5 transition-all duration-300 shadow-lg shadow-primary/10 hover:shadow-primary/30"
          >
            <ShoppingCart className="w-3 h-3" />
            Add to Bag
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
