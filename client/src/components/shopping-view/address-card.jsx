import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { MapPin, Phone, Hash, FileText, CheckCircle2, Edit3, Trash2 } from "lucide-react";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  const isActive = selectedId?._id === addressInfo?._id;

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`relative cursor-pointer transition-all duration-300 overflow-hidden rounded-2xl border group ${
        isActive
          ? "border-white bg-slate-800/90 shadow-2xl ring-1 ring-white/30"
          : "border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:bg-slate-900 shadow-md"
      }`}
    >
      <CardContent className="p-5 space-y-3.5">
        {isActive && (
            <div className="absolute top-3.5 right-3.5 animate-in zoom-in duration-300">
                <CheckCircle2 className="w-5 h-5 text-white fill-white/20" />
            </div>
        )}
        
        <div className="space-y-2.5">
            <div className="flex items-start gap-2.5">
                <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-white text-slate-950' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'}`}>
                    <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                    <Label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Location</Label>
                    <p className="text-xs font-bold text-slate-100 leading-tight">{addressInfo?.address}, {addressInfo?.city}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start gap-2.5">
                    <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-white text-slate-950' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'}`}>
                        <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div>
                        <Label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Phone</Label>
                        <p className="text-xs font-bold text-slate-200">{addressInfo?.phone}</p>
                    </div>
                </div>
                <div className="flex items-start gap-2.5">
                    <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-white text-slate-950' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'}`}>
                        <Hash className="w-3.5 h-3.5" />
                    </div>
                    <div>
                        <Label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Postal</Label>
                        <p className="text-xs font-bold text-slate-200">{addressInfo?.pincode}</p>
                    </div>
                </div>
            </div>

            {addressInfo?.notes && (
                <div className="flex items-start gap-2.5 pt-2 border-t border-slate-800/80 mt-1">
                    <div className="p-1.5 rounded-lg bg-slate-800 text-slate-400">
                        <FileText className="w-3 h-3" />
                    </div>
                    <div className="flex-1">
                        <Label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Note</Label>
                        <p className="text-[11px] font-normal text-slate-300 italic leading-snug">"{addressInfo?.notes}"</p>
                    </div>
                </div>
            )}
        </div>
      </CardContent>
      
      <CardFooter className="p-3 bg-slate-950/60 flex justify-end gap-1.5 border-t border-slate-800">
        <Button 
            size="sm"
            variant="ghost" 
            onClick={(e) => {
                e.stopPropagation();
                handleEditAddress(addressInfo);
            }}
            className="rounded-lg h-7 px-3 text-[11px] font-bold text-slate-300 hover:bg-slate-800 hover:text-white"
        >
            <Edit3 className="w-3 h-3 mr-1.5" />
            Edit
        </Button>
        <Button 
            size="sm"
            variant="ghost" 
            onClick={(e) => {
                e.stopPropagation();
                handleDeleteAddress(addressInfo);
            }}
            className="rounded-lg h-7 px-3 text-[11px] font-bold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300"
        >
            <Trash2 className="w-3 h-3 mr-1.5" />
            Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;

