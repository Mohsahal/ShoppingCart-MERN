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
      className={`relative cursor-pointer transition-all duration-500 overflow-hidden rounded-3xl border-2 group ${
        isActive
          ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
          : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-md"
      }`}
    >
      <CardContent className="p-6 space-y-4">
        {isActive && (
            <div className="absolute top-4 right-4 animate-in zoom-in duration-300">
                <CheckCircle2 className="w-6 h-6 text-primary fill-primary/10" />
            </div>
        )}
        
        <div className="space-y-3">
            <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'bg-slate-50 text-slate-400 group-hover:text-slate-600'}`}>
                    <MapPin className="w-4 h-4" />
                </div>
                <div>
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Location</Label>
                    <p className="text-sm font-bold text-slate-800 leading-tight">{addressInfo?.address}, {addressInfo?.city}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'bg-slate-50 text-slate-400 group-hover:text-slate-600'}`}>
                        <Phone className="w-4 h-4" />
                    </div>
                    <div>
                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Contact</Label>
                        <p className="text-sm font-bold text-slate-800">{addressInfo?.phone}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'bg-slate-50 text-slate-400 group-hover:text-slate-600'}`}>
                        <Hash className="w-4 h-4" />
                    </div>
                    <div>
                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Postal</Label>
                        <p className="text-sm font-bold text-slate-800">{addressInfo?.pincode}</p>
                    </div>
                </div>
            </div>

            {addressInfo?.notes && (
                <div className="flex items-start gap-3 pt-2 border-t border-slate-100 mt-2">
                    <div className="p-2 rounded-xl bg-slate-50 text-slate-400">
                        <FileText className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Logistics Note</Label>
                        <p className="text-[11px] font-medium text-slate-500 italic leading-relaxed">"{addressInfo?.notes}"</p>
                    </div>
                </div>
            )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 bg-slate-50/50 flex justify-end gap-2 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button 
            size="sm"
            variant="ghost" 
            onClick={(e) => {
                e.stopPropagation();
                handleEditAddress(addressInfo);
            }}
            className="rounded-xl h-9 px-4 text-xs font-bold text-slate-600 hover:bg-white hover:text-primary"
        >
            <Edit3 className="w-3.5 h-3.5 mr-2" />
            Edit
        </Button>
        <Button 
            size="sm"
            variant="ghost" 
            onClick={(e) => {
                e.stopPropagation();
                handleDeleteAddress(addressInfo);
            }}
            className="rounded-xl h-9 px-4 text-xs font-bold text-slate-400 hover:bg-rose-50 hover:text-rose-600"
        >
            <Trash2 className="w-3.5 h-3.5 mr-2" />
            Remove
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
