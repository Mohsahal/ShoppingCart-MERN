import { UploadCloudIcon, XIcon, CheckCircle2 } from "lucide-react";
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
      <Label className="text-xs font-bold text-slate-700 mb-2.5 block uppercase tracking-wider">
        Product Visual Resource
      </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative transition-all duration-300 rounded-2xl border-2 border-dashed ${
          isEditMode ? "opacity-60 cursor-not-allowed bg-slate-100 border-slate-200" : 
          imageFile ? "border-emerald-500/50 bg-emerald-50/50" : "border-slate-200 hover:border-slate-400 bg-white"
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
            } flex flex-col items-center justify-center min-h-[150px]`}
          >
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl mb-3 group-hover:border-slate-300 group-hover:bg-slate-100 transition-all">
                <UploadCloudIcon className="w-8 h-8 text-slate-500 group-hover:text-slate-900 transition-colors" />
            </div>
            <p className="font-bold text-slate-900 text-xs">Drop media or click to upload</p>
            <p className="text-[10px] text-slate-400 mt-1 font-medium">PNG, JPG or WebP up to 10MB</p>
          </Label>
        ) : imageLoadingState ? (
          <div className="flex flex-col items-center justify-center min-h-[150px] animate-pulse">
             <div className="w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mb-3" />
             <p className="text-xs font-bold text-slate-700">Synchronizing with cloud storage...</p>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-3.5 rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 truncate max-w-[150px]">{imageFile.name}</span>
                  <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider">Ready to Save</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg hover:bg-rose-50 hover:text-rose-600 text-slate-400 transition-colors h-8 w-8"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;


