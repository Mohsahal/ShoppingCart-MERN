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
import Loader from "@/components/common/loader";
import { ShoppingBasket, Plus, TrendingUp } from "lucide-react";

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

  if (isLoading) return <Loader />;

  return (
    <Fragment>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
              <ShoppingBasket className="h-8 w-8 text-primary" />
              Product Inventory
            </h1>
            <p className="text-slate-500 text-sm">Manage your catalog, prices and stock levels.</p>
          </div>
          <Button 
            onClick={() => setOpenCreateProductsDialog(true)}
            className="rounded-xl shadow-md hover:shadow-lg transition-all flex gap-2 items-center px-6 py-5"
          >
            <Plus className="h-5 w-5" />
            Add New Product
          </Button>
        </div>

        {/* Quick Stats Mini Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-8 px-8">
           <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                 <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total Items</p>
                <p className="text-lg font-bold text-slate-900">{productList?.length}</p>
              </div>
           </div>
           <div className="h-8 w-[1px] bg-slate-100" />
           <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                 <ShoppingBasket className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">In Stock</p>
                <p className="text-lg font-bold text-slate-900">
                  {productList?.filter(p => p.totalStock > 0).length}
                </p>
              </div>
           </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2">
          {productList && productList.length > 0
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
                <div className="col-span-full py-20 bg-white rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center gap-4">
                  <ShoppingBasket className="h-12 w-12 text-slate-300" />
                  <p className="text-slate-500 font-medium">Your inventory is empty. Start by adding a product!</p>
                  <Button variant="outline" onClick={() => setOpenCreateProductsDialog(true)}>Create First Product</Button>
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
        <SheetContent side="right" className="overflow-auto w-full sm:max-w-lg p-0 border-l-0 shadow-2xl">
          <div className="bg-white h-full flex flex-col">
            <SheetHeader className="p-8 border-b bg-slate-50/50">
              <SheetTitle className="text-2xl font-bold flex items-center gap-2">
                <div className="bg-primary p-2 rounded-lg">
                   <Plus className="h-5 w-5 text-white" />
                </div>
                {currentEditedId !== null ? "Modify Product" : "Create New Product"}
              </SheetTitle>
              <p className="text-slate-500 text-sm">Fill in the details below to {currentEditedId !== null ? 'update' : 'add'} your product.</p>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
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
