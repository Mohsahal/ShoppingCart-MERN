import { useContext, useEffect, useState } from "react";
import { CommonContext } from "@/context/common-context";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Image, Trash2, Plus, LayoutDashboard } from "lucide-react";

function AdminFeatures() {
  const {
    featureImageList,
    getFeatureImages,
    addFeatureImage,
    deleteFeatureImage,
  } = useContext(CommonContext);

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    getFeatureImages();
  }, []);

  async function handleUploadBanner() {
    if (!uploadedImageUrl) return;
    setIsSubmitting(true);
    try {
      const data = await addFeatureImage(uploadedImageUrl);
      if (data?.success) {
        toast({ title: "Banner uploaded successfully!" });
        setImageFile(null);
        setUploadedImageUrl("");
        getFeatureImages();
      }
    } catch (e) {
      toast({ title: "Failed to upload banner", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteBanner(id) {
    try {
      const data = await deleteFeatureImage(id);
      if (data?.success) {
        toast({ title: "Banner deleted successfully!" });
        getFeatureImages();
      }
    } catch (e) {
      toast({ title: "Failed to delete banner", variant: "destructive" });
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl">
              <LayoutDashboard className="h-6 w-6 text-white" />
            </div>
            Banner Management
          </h1>
          <p className="text-slate-500 text-sm ml-[52px]">
            Upload and manage the homepage slider banners.
          </p>
        </div>
        <div className="bg-white border border-slate-100 shadow-sm rounded-2xl px-6 py-3 flex items-center gap-3">
          <Image className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
              Total Banners
            </p>
            <p className="text-lg font-bold text-slate-900">
              {featureImageList?.length ?? 0}
            </p>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Upload New Banner
        </h2>
        <div className="max-w-2xl">
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={false}
            isCustomStyling={true}
          />
          <Button
            onClick={handleUploadBanner}
            disabled={!uploadedImageUrl || imageLoadingState || isSubmitting}
            className="mt-6 px-8 py-5 rounded-xl font-bold tracking-wide text-sm uppercase transition-all"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add to Slider
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Current Banners Grid */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Image className="h-5 w-5 text-primary" />
          Current Banners
        </h2>

        {featureImageList && featureImageList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureImageList.map((item, index) => (
              <div
                key={item._id}
                className="group relative rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 bg-slate-50"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={item.image?.replace(/^http:\/\//, "https://")}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <Button
                    onClick={() => handleDeleteBanner(item._id)}
                    variant="destructive"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full h-12 w-12 shadow-xl"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white text-xs font-bold uppercase tracking-widest">
                    Banner {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4">
            <div className="bg-slate-100 p-5 rounded-full">
              <Image className="h-10 w-10 text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">
              No banners uploaded yet.
            </p>
            <p className="text-slate-400 text-sm">
              Upload your first banner using the form above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminFeatures;
