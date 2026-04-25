import { StarIcon, ShoppingCart, Star, MessageSquare } from "lucide-react";
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
    if (!user) {
      if(setOpen) setOpen(false);
      navigate("/auth/login");
      return;
    }
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
      <DialogContent className="grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border-none p-0 shadow-2xl max-h-[84vh] w-[92vw] sm:w-[86vw] lg:w-full lg:max-w-[900px] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
        <div className="relative flex min-h-[200px] items-center justify-center bg-slate-50 p-4 sm:p-5 lg:min-h-[500px] lg:p-5">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="aspect-square w-full max-h-[200px] object-contain mix-blend-multiply drop-shadow-2xl transition-transform duration-500 hover:scale-105 sm:max-h-[270px] lg:max-h-[380px]"
          />
          {productDetails?.salePrice > 0 && (
             <Badge className="absolute top-4 left-4 md:top-6 md:left-6 bg-primary text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-black shadow-lg">
                SALE
             </Badge>
          )}
        </div>
        
        <div className="flex min-h-0 flex-col bg-white">
          <DialogHeader className="p-4 md:p-5 pb-3">
             <div className="space-y-1 md:space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">{productDetails?.category} | {productDetails?.brand}</span>
                    <Badge variant="outline" className={`${productDetails?.totalStock > 0 ? 'text-emerald-600 border-emerald-100' : 'text-rose-600 border-rose-100'} font-bold text-[10px]`}>
                        {productDetails?.totalStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                </div>
                <DialogTitle className="text-lg md:text-2xl font-black text-slate-900 leading-none">
                    {productDetails?.title}
                </DialogTitle>
                <DialogDescription className="text-slate-500 text-sm md:text-base leading-relaxed line-clamp-2">
                    {productDetails?.description}
                </DialogDescription>
             </div>
          </DialogHeader>

          <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-4 md:gap-4 md:px-5 pb-4">
            <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 md:flex-row md:items-center md:justify-between md:rounded-2xl md:p-4">
               <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Current Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-slate-900">${productDetails?.salePrice > 0 ? productDetails?.salePrice : productDetails?.price}</span>
                    {productDetails?.salePrice > 0 && (
                        <span className="text-sm font-bold text-slate-400 line-through">${productDetails?.price}</span>
                    )}
                  </div>
               </div>
               <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 mb-1">
                        <StarRatingComponent rating={averageReview} />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{reviews?.length} Customer Reviews</span>
               </div>
            </div>

            <div className="space-y-4 min-h-0">
              <div className="flex items-center gap-2">
                 <MessageSquare className="h-4 w-4 text-primary" />
                 <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Product Sentiments</h3>
              </div>
              
              <div className="max-h-[180px] space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 md:max-h-[220px]">
                {reviews && reviews.length > 0 ? (
                  reviews.map((reviewItem) => (
                    <div key={reviewItem?._id} className="flex gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-50">
                      <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                        <AvatarFallback className="bg-primary text-white font-bold">
                          {reviewItem?.userName ? reviewItem.userName[0].toUpperCase() : "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-sm text-slate-900">{reviewItem?.userName}</h3>
                          <div className="flex scale-75 origin-right">
                            <StarRatingComponent rating={reviewItem?.reviewValue} />
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed italic">
                          "{reviewItem.reviewMessage}"
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                     <p className="text-xs font-bold text-slate-400 uppercase">Be the first to review</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                 <Star className="h-4 w-4 text-primary" />
                 <h3 className="text-xs font-black text-white uppercase tracking-wider">Leave a Review</h3>
              </div>
              <div className="flex flex-col gap-4">
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
                        placeholder="Tell us what you think..."
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-xl"
                    />
                    <Button
                        onClick={handleAddReview}
                        disabled={reviewMsg.trim() === "" || rating === 0}
                        className="bg-primary hover:bg-primary/90 text-white rounded-xl font-bold px-6"
                    >
                        Send
                    </Button>
                 </div>
              </div>
            </div>
          </div>

          <div className="mt-auto border-t border-slate-100 bg-slate-50 p-4 md:p-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full py-5 text-base font-black rounded-2xl bg-slate-300 text-slate-500 cursor-not-allowed shadow-none border-none">
                OUT OF STOCK
              </Button>
            ) : (
              <Button
                className="w-full py-5 text-base font-black rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex gap-3 items-center justify-center group"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                <ShoppingCart className="h-6 w-6 group-hover:animate-bounce" />
                ADD TO CART
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
