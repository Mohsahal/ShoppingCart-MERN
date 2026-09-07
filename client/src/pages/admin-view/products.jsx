import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import { useContext, Fragment, useEffect, useState } from "react";
import { AdminContext } from "@/context/admin-context";
import { ShoppingBasket, Plus, TrendingUp, Loader2 } from "lucide-react";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const {
    productList,
    addNewProduct,
    fetchAllProducts,
    editProduct,
    deleteProduct,
    isLoading,
  } = useContext(AdminContext);
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? editProduct(currentEditedId, {
          ...formData,
          image: uploadedImageUrl || formData.image,
        }).then((data) => {
          if (data?.success) {
            fetchAllProducts();
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
            setUploadedImageUrl("");
            toast({
              title: "Product updated successfully",
            });
          }
        })
      : addNewProduct({
          ...formData,
          image: uploadedImageUrl,
        }).then((data) => {
          if (data?.success) {
            fetchAllProducts();
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setUploadedImageUrl("");
            setFormData(initialFormData);
            toast({
              title: "Product added successfully",
            });
          }
        });
  }

  function handleDelete(getCurrentProductId) {
    deleteProduct(getCurrentProductId).then((data) => {
      if (data?.success) {
        fetchAllProducts();
        toast({
          title: "Product deleted successfully",
        });
      }
    });
  }

  function isFormValid() {
    const imageValid =
      currentEditedId !== null ? !!formData.image : !!uploadedImageUrl;

    return (
      imageValid &&
      Object.keys(formData)
        .filter((key) => key !== "averageReview" && key !== "image")
        .map((key) => formData[key] !== "")
        .every((item) => item)
    );
  }

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <Fragment>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2.5">
              <ShoppingBasket className="h-7 w-7 text-slate-900" />
              Product Inventory
            </h1>
            <p className="text-slate-500 text-xs font-medium">Manage your luxury catalog, prices and stock levels.</p>
          </div>
          <Button 
            onClick={() => setOpenCreateProductsDialog(true)}
            className="rounded-xl shadow-md bg-slate-900 hover:bg-slate-800 text-white font-bold flex gap-2 items-center px-5 py-4 text-xs tracking-wider uppercase transition-all"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Quick Stats Mini Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 flex items-center gap-8 px-6">
           <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-2 rounded-xl text-slate-800">
                 <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Items</p>
                <p className="text-base font-bold text-slate-900">{productList?.length || 0}</p>
              </div>
           </div>
           <div className="h-6 w-[1px] bg-slate-200" />
           <div className="flex items-center gap-3">
              <div className="bg-emerald-50 border border-emerald-100 p-2 rounded-xl text-emerald-600">
                 <ShoppingBasket className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">In Stock</p>
                <p className="text-base font-bold text-slate-900">
                  {productList?.filter(p => p.totalStock > 0).length || 0}
                </p>
              </div>
           </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2">
          {isLoading ? (
            <div className="col-span-full py-24 bg-white rounded-3xl border border-slate-200 flex flex-col items-center justify-center gap-4 shadow-sm">
              <Loader2 className="h-8 w-8 text-slate-900 animate-spin" />
            </div>
          ) : productList && productList.length > 0
            ? productList.map((productItem) => (
                <div key={productItem._id} className="transition-all duration-300 hover:-translate-y-1">
                  <AdminProductTile
                    setFormData={setFormData}
                    setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                    setCurrentEditedId={setCurrentEditedId}
                    product={productItem}
                    handleDelete={handleDelete}
                  />
                </div>
              ))
            : (
                <div className="col-span-full py-20 bg-white rounded-3xl border border-dashed border-slate-300 flex flex-col items-center justify-center gap-4 shadow-sm">
                  <ShoppingBasket className="h-12 w-12 text-slate-400" />
                  <p className="text-slate-600 font-medium text-sm">Your inventory is empty. Start by adding a product!</p>
                  <Button variant="outline" className="border-slate-200 bg-white text-slate-900 hover:bg-slate-50" onClick={() => setOpenCreateProductsDialog(true)}>Create First Product</Button>
                </div>
            )}
        </div>
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto w-full sm:max-w-lg p-0 border-l border-slate-200 bg-white text-slate-900 shadow-2xl">
          <div className="bg-white h-full flex flex-col">
            <SheetHeader className="p-6 sm:p-8 border-b border-slate-200 bg-slate-50/70">
              <SheetTitle className="text-xl font-bold flex items-center gap-2 text-slate-900">
                <div className="bg-slate-900 text-white p-2 rounded-xl">
                   <Plus className="h-4 w-4" />
                </div>
                {currentEditedId !== null ? "Modify Product" : "Create New Product"}
              </SheetTitle>
              <p className="text-slate-500 text-xs">Fill in the details below to {currentEditedId !== null ? 'update' : 'add'} your product.</p>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <ProductImageUpload
                  imageFile={imageFile}
                  setImageFile={setImageFile}
                  uploadedImageUrl={uploadedImageUrl}
                  setUploadedImageUrl={setUploadedImageUrl}
                  setImageLoadingState={setImageLoadingState}
                  imageLoadingState={imageLoadingState}
                  isEditMode={currentEditedId !== null}
                />
              </div>
              
              <div className="pb-8">
                <CommonForm
                  onSubmit={onSubmit}
                  formData={formData}
                  setFormData={setFormData}
                  buttonText={currentEditedId !== null ? "Update Product" : "Publish Product"}
                  formControls={addProductFormElements}
                  isBtnDisabled={!isFormValid() || imageLoadingState}
                  isLight={true}
                />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;


