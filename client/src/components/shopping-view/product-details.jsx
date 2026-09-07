import { StarIcon, ShoppingBag, Star, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useContext, useEffect, useState } from "react";
import { ShoppingContext } from "@/context/shopping-context";
import { AuthContext } from "@/context/auth-context";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useContext(AuthContext);
  const {
    cartItems,
    reviews,
    addToCart,
    setProductDetails,
    addReview,
    getReviews,
  } = useContext(ShoppingContext);

  const { toast } = useToast();
  const navigate = useNavigate();

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    if (!user) {
      if(setOpen) setOpen(false);
      navigate("/auth/login");
      return;
    }
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    addToCart(user?.id, getCurrentProductId, 1).then((data) => {
      if (data?.success) {
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    setProductDetails(null);
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    addReview({
      productId: productDetails?._id,
      userId: user?.id,
      userName: user?.userName,
      reviewMessage: reviewMsg,
      reviewValue: rating,
    }).then((data) => {
      if (data?.success) {
        setRating(0);
        setReviewMsg("");
        getReviews(productDetails?._id);
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) getReviews(productDetails?._id);
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 gap-0 overflow-hidden rounded-3xl border border-slate-800 p-0 shadow-2xl max-h-[86vh] w-[92vw] sm:w-[86vw] lg:w-full lg:max-w-[900px] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] bg-slate-950 text-white">
        <div className="relative flex min-h-[220px] items-center justify-center bg-slate-900/60 p-4 sm:p-6 lg:min-h-[500px] lg:p-6">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="aspect-square w-full max-h-[220px] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105 sm:max-h-[280px] lg:max-h-[380px]"
          />
          {productDetails?.salePrice > 0 && (
             <Badge className="absolute top-4 left-4 md:top-6 md:left-6 bg-white text-slate-950 px-3 md:px-4 py-1 rounded-full text-xs font-bold shadow-xl">
                SALE
             </Badge>
          )}
        </div>
        
        <div className="flex min-h-0 flex-col bg-slate-950">
          <DialogHeader className="p-5 md:p-6 pb-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{productDetails?.category} • {productDetails?.brand}</span>
                    <Badge variant="outline" className={`${productDetails?.totalStock > 0 ? 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40' : 'text-rose-400 border-rose-500/30 bg-rose-950/40'} font-semibold text-xs`}>
                        {productDetails?.totalStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                </div>
                <DialogTitle className="text-xl md:text-2xl font-bold text-white leading-snug">
                    {productDetails?.title}
                </DialogTitle>
                <DialogDescription className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                    {productDetails?.description}
                </DialogDescription>
             </div>
          </DialogHeader>

          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 md:px-6 pb-4">
            <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:flex-row md:items-center md:justify-between">
               <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-400">Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white">${productDetails?.salePrice > 0 ? productDetails?.salePrice : productDetails?.price}</span>
                    {productDetails?.salePrice > 0 && (
                        <span className="text-sm font-normal text-slate-500 line-through">${productDetails?.price}</span>
                    )}
                  </div>
               </div>
               <div className="flex flex-col md:items-end">
                    <div className="flex items-center gap-1 mb-1">
                        <StarRatingComponent rating={averageReview} />
                    </div>
                    <span className="text-xs font-medium text-slate-400">{reviews?.length || 0} Customer Reviews</span>
               </div>
            </div>

            <div className="space-y-3 min-h-0">
              <div className="flex items-center gap-2">
                 <MessageSquare className="h-4 w-4 text-slate-400" />
                 <h3 className="text-sm font-bold text-white">Customer Reviews</h3>
              </div>
              
              <div className="max-h-[160px] space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 md:max-h-[180px]">
                {reviews && reviews.length > 0 ? (
                  reviews.map((reviewItem) => (
                    <div key={reviewItem?._id} className="flex gap-3 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 shadow-sm">
                      <Avatar className="w-8 h-8 border border-slate-700">
                        <AvatarFallback className="bg-slate-800 text-white font-bold text-xs">
                          {reviewItem?.userName ? reviewItem.userName[0].toUpperCase() : "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs text-white">{reviewItem?.userName}</h4>
                          <div className="flex scale-75 origin-right">
                            <StarRatingComponent rating={reviewItem?.reviewValue} />
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {reviewItem.reviewMessage}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-6 text-center bg-slate-900/40 rounded-xl border border-dashed border-slate-800">
                     <p className="text-xs font-medium text-slate-400">No reviews yet. Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3 text-white">
              <div className="flex items-center gap-2">
                 <Star className="h-4 w-4 text-amber-400" />
                 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Write a Review</h4>
              </div>
              <div className="flex flex-col gap-3">
                 <div className="flex gap-1 justify-center">
                    <StarRatingComponent
                      rating={rating}
                      handleRatingChange={handleRatingChange}
                    />
                 </div>
                 <div className="flex gap-2">
                    <Input
                        name="reviewMsg"
                        value={reviewMsg}
                        onChange={(event) => setReviewMsg(event.target.value)}
                        placeholder="Write your review here..."
                        className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-500 rounded-xl text-sm"
                    />
                    <Button
                        onClick={handleAddReview}
                        disabled={reviewMsg.trim() === "" || rating === 0}
                        className="bg-white text-slate-950 hover:bg-slate-200 rounded-xl font-bold px-5 text-xs shadow-md"
                    >
                        Submit
                    </Button>
                 </div>
              </div>
            </div>
          </div>

          <div className="mt-auto border-t border-slate-800 bg-slate-950 p-4 md:p-5">
            {productDetails?.totalStock === 0 ? (
              <Button disabled className="w-full py-4 text-sm font-semibold rounded-xl bg-slate-900 text-slate-500 cursor-not-allowed shadow-none border-none">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full py-4 text-sm font-bold rounded-xl bg-white hover:bg-slate-200 text-slate-950 shadow-xl transition-all flex gap-2.5 items-center justify-center"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Bag
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
