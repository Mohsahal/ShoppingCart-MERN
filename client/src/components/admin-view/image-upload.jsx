import { FileIcon, UploadCloudIcon, XIcon, CheckCircle2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
            data
        );
      
        if (response?.data?.success) {
            setUploadedImageUrl(response.data.result.url);
        }
    } catch (error) {
        console.error("Image upload failed", error);
    } finally {
        setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className={`w-full ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-sm font-bold text-slate-700 mb-3 block uppercase tracking-wider">
        Product Visual Resource
      </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative transition-all duration-300 rounded-2xl border-2 border-dashed ${
          isEditMode ? "opacity-60 cursor-not-allowed bg-slate-50 border-slate-200" : 
          imageFile ? "border-emerald-200 bg-emerald-50/30" : "border-slate-200 hover:border-primary/50 bg-white"
        } p-6`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : "cursor-pointer group"
            } flex flex-col items-center justify-center min-h-[160px]`}
          >
            <div className="bg-slate-100 p-4 rounded-full mb-4 group-hover:bg-primary/10 transition-colors">
                <UploadCloudIcon className="w-10 h-10 text-slate-400 group-hover:text-primary transition-colors" />
            </div>
            <p className="font-bold text-slate-700">Drop your image here</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">PNG, JPG or WebP up to 10MB</p>
          </Label>
        ) : imageLoadingState ? (
          <div className="flex flex-col items-center justify-center min-h-[160px] animate-pulse">
             <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
             <p className="text-sm font-bold text-slate-600">Syncing with cloud...</p>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-white border border-emerald-100 p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800 truncate max-w-[150px]">{imageFile.name}</span>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-tighter">Ready to Save</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg hover:bg-rose-50 hover:text-rose-600 text-slate-400 transition-colors"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-5 h-5" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
