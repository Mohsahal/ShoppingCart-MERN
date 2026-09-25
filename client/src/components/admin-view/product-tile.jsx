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
    <Card className="w-full max-w-sm mx-auto overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl group border border-slate-100 bg-white flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
            <Badge className="bg-white/90 text-slate-900 border-none backdrop-blur-md shadow-sm font-bold">
                {product?.category}
            </Badge>
            {product?.totalStock < 5 && product?.totalStock > 0 && (
                <Badge className="bg-orange-500 text-white border-none shadow-sm">
                    Low Stock: {product?.totalStock}
                </Badge>
            )}
            {product?.totalStock === 0 && (
                <Badge className="bg-red-500 text-white border-none shadow-sm">
                    Out of Stock
                </Badge>
            )}
        </div>
        
        {product?.salePrice > 0 && (
          <div className="absolute top-3 right-3">
             <div className="bg-primary text-white p-2 rounded-full shadow-lg">
                <Tag size={16} />
             </div>
          </div>
        )}
      </div>
      
      <CardContent className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{product?.brand}</p>
            <div className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                <span className="text-[10px] font-bold text-slate-600">Stock: {product?.totalStock}</span>
            </div>
        </div>
        
        <h2 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-primary transition-colors cursor-default mb-1">
            {product?.title}
        </h2>
        
        <p className="text-xs text-slate-500 line-clamp-2 mb-4 min-h-[32px]">
            {product?.description}
        </p>
        
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-2xl font-black text-primary">
            ${product?.salePrice > 0 ? product?.salePrice : product?.price}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-sm font-medium text-slate-400 line-through">
              ${product?.price}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 flex gap-3">
        <Button
          onClick={() => {
            setOpenCreateProductsDialog(true);
            setCurrentEditedId(product?._id);
            setFormData(product);
          }}
          className="flex-1 rounded-xl bg-slate-900 hover:bg-slate-800 flex items-center gap-2 py-5"
        >
          <Edit size={16} />
          Edit
        </Button>
        <Button 
          variant="outline" 
          onClick={() => handleDelete(product?._id)}
          className="rounded-xl border-slate-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-100 p-3"
        >
          <Trash2 size={18} />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
