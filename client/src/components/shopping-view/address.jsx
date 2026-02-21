import { useContext, useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import AddressCard from "./address-card";
import { useToast } from "../ui/use-toast";
import { ShoppingContext } from "@/context/shopping-context";
import { AuthContext } from "@/context/auth-context";
import { MapPinned, PlusCircle, LayoutGrid } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { addressList, fetchAllAddresses, addNewAddress, updateAddress, deleteAddress } = useContext(ShoppingContext);
  const { user } = useContext(AuthContext);
  const { toast } = useToast();

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can add max 3 addresses",
        variant: "destructive",
      });

      return;
    }

    currentEditedId !== null
      ? updateAddress(user?.id, currentEditedId, formData).then((data) => {
          if (data?.success) {
            fetchAllAddresses(user?.id);
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast({
              title: "Address updated successfully",
            });
          }
        })
      : addNewAddress({
          ...formData,
          userId: user?.id,
        }).then((data) => {
          if (data?.success) {
            fetchAllAddresses(user?.id);
            setFormData(initialAddressFormData);
            toast({
              title: "Address added successfully",
            });
          }
        });
  }

  function handleDeleteAddress(getCurrentAddress) {
    deleteAddress(user?.id, getCurrentAddress._id).then((data) => {
      if (data?.success) {
        fetchAllAddresses(user?.id);
        toast({
          title: "Address deleted successfully",
        });
      }
    });
  }

  function handleEditAddress(getCuurentAddress) {
    setCurrentEditedId(getCuurentAddress?._id);
    setFormData({
      ...formData,
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      phone: getCuurentAddress?.phone,
      pincode: getCuurentAddress?.pincode,
      notes: getCuurentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    if (user?.id) fetchAllAddresses(user?.id);
  }, [user]);

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <LayoutGrid className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Saved Addresses</h3>
            </div>
            <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-bold rounded-full px-3 underline decoration-primary decoration-2 underline-offset-4">
                {addressList?.length} / 3
            </Badge>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {addressList && addressList.length > 0
            ? addressList.map((singleAddressItem) => (
                <AddressCard
                    key={singleAddressItem?._id}
                    selectedId={selectedId}
                    handleDeleteAddress={handleDeleteAddress}
                    addressInfo={singleAddressItem}
                    handleEditAddress={handleEditAddress}
                    setCurrentSelectedAddress={setCurrentSelectedAddress}
                />
                ))
            : (
                <div className="col-span-full py-12 border-2 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center text-center">
                    <MapPinned className="h-10 w-10 text-slate-200 mb-4" />
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">No addresses found</p>
                    <p className="text-xs text-slate-300 font-medium">Add a shipping destination below</p>
                </div>
            )}
        </div>
      </div>

      <div className="bg-slate-50 rounded-[2rem] border border-slate-200/50 p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-8">
            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                <PlusCircle className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                 {currentEditedId !== null ? "Modify Details" : "Register New Point"}
            </h3>
        </div>
        
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Sync Changes" : "Save Destination"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />

        {currentEditedId !== null && (
            <Button 
                variant="ghost" 
                onClick={() => {
                    setCurrentEditedId(null);
                    setFormData(initialAddressFormData);
                }}
                className="w-full mt-4 text-xs font-black text-slate-400 hover:text-slate-600 tracking-widest uppercase"
            >
                Discard Edits
            </Button>
        )}
      </div>
    </div>
  );
}

export default Address;
