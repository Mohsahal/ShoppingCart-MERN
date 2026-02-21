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
    <Card className="w-full max-w-sm mx-auto group overflow-hidden border-none shadow-md hover:shadow-2xl transition-all duration-500 rounded-3xl bg-white relative">
      <div onClick={() => handleGetProductDetails(product?._id)} className="cursor-pointer">
        <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
             <Button variant="white" size="icon" className="rounded-full shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                <Eye className="w-5 h-5 text-slate-900" />
             </Button>
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product?.totalStock === 0 ? (
                <Badge className="bg-rose-500 text-white border-none shadow-lg px-3 py-1 font-bold text-[10px] uppercase tracking-wider">
                Sold Out
                </Badge>
            ) : product?.totalStock < 10 ? (
                <Badge className="bg-orange-500 text-white border-none shadow-lg px-3 py-1 font-bold text-[10px] uppercase tracking-wider">
                Limited: {product?.totalStock} left
                </Badge>
            ) : product?.salePrice > 0 ? (
                <Badge className="bg-primary text-white border-none shadow-lg px-3 py-1 font-bold text-[10px] uppercase tracking-wider">
                Sale
                </Badge>
            ) : null}
          </div>
          
          {/* Rating Badge */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm border border-white/20">
             <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
             <span className="text-[10px] font-black text-slate-800">{product?.averageReview || "4.5"}</span>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[10px] font-black text-primary uppercase tracking-wider">
               {brandOptionsMap[product?.brand]}
            </span>
          </div>

          <h2 className="text-lg font-black text-slate-900 mb-3 truncate group-hover:text-primary transition-colors">
            {product?.title}
          </h2>

          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-black text-slate-900`}>
              ${product?.salePrice > 0 ? product?.salePrice : product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-sm font-bold text-slate-400 line-through">
                ${product?.price}
              </span>
            )}
          </div>
        </CardContent>
      </div>

      <CardFooter className="p-6 pt-0">
        {product?.totalStock === 0 ? (
          <Button className="w-full py-6 rounded-2xl bg-slate-100 text-slate-400 cursor-not-allowed border-none shadow-none font-bold uppercase tracking-widest text-xs">
            Sold Out
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full py-6 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all duration-300 group-hover:shadow-xl translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <ShoppingCart className="w-4 h-4" />
            Grab it now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
