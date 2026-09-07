import { Edit, Trash2, Tag } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 rounded-2xl group bg-white text-slate-900 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <Badge className="bg-white/95 text-slate-900 border border-slate-200 backdrop-blur-md shadow-sm font-bold text-[10px] uppercase tracking-wider">
                {product?.category}
            </Badge>
            {product?.totalStock < 5 && product?.totalStock > 0 && (
                <Badge className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                    Low: {product?.totalStock}
                </Badge>
            )}
            {product?.totalStock === 0 && (
                <Badge className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold">
                    Out of Stock
                </Badge>
            )}
        </div>
        
        {product?.salePrice > 0 && (
          <div className="absolute top-3 right-3">
             <div className="bg-slate-900 text-white p-2 rounded-full shadow-md">
                <Tag size={13} />
             </div>
          </div>
        )}
      </div>
      
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1.5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product?.brand}</p>
            <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                <span className="text-[10px] font-bold text-slate-700">Stock: {product?.totalStock}</span>
            </div>
        </div>
        
        <h2 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-slate-700 transition-colors cursor-default mb-1">
            {product?.title}
        </h2>
        
        <p className="text-xs text-slate-500 line-clamp-2 mb-3 min-h-[32px]">
            {product?.description}
        </p>
        
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-lg font-black text-slate-900">
            ${product?.salePrice > 0 ? product?.salePrice : product?.price}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-xs font-medium text-slate-400 line-through">
              ${product?.price}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          onClick={() => {
            setOpenCreateProductsDialog(true);
            setCurrentEditedId(product?._id);
            setFormData(product);
          }}
          className="flex-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center justify-center gap-2 py-4 text-xs tracking-wider uppercase transition-all shadow-sm"
        >
          <Edit size={14} />
          Edit
        </Button>
        <Button 
          variant="outline" 
          onClick={() => handleDelete(product?._id)}
          className="rounded-xl border-slate-200 bg-white text-rose-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 p-2.5 transition-all"
        >
          <Trash2 size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;


