import { useContext, useEffect, useState } from "react";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import AddressCard from "./address-card";
import { useToast } from "../ui/use-toast";
import { ShoppingContext } from "@/context/shopping-context";
import { AuthContext } from "@/context/auth-context";
import { MapPinned, PlusCircle, LayoutGrid } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";

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
    <div className="space-y-8">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
                <LayoutGrid className="h-4 w-4 text-white" />
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Saved Addresses</h3>
            </div>
            <Badge variant="secondary" className="bg-slate-800 text-slate-300 font-bold rounded-full px-3 text-[10px] border border-slate-700">
                {addressList?.length || 0} / 3
            </Badge>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="col-span-full py-10 border border-dashed border-slate-800 bg-slate-950/40 rounded-2xl flex flex-col items-center justify-center text-center">
                    <MapPinned className="h-8 w-8 text-slate-600 mb-3" />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">No addresses saved yet</p>
                    <p className="text-xs text-slate-500 font-medium">Add a delivery destination below</p>
                </div>
            )}
        </div>
      </div>

      <div className="bg-slate-950/70 rounded-2xl border border-slate-800 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
            <div className="bg-slate-800 p-2 rounded-xl border border-slate-700 text-white">
                <PlusCircle className="h-4 w-4" />
            </div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">
                 {currentEditedId !== null ? "Modify Address" : "Add New Address"}
            </h3>
        </div>
        
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Save Changes" : "Save Address"}
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
              className="w-full mt-3 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 tracking-wider uppercase rounded-xl"
          >
              Discard Edits
          </Button>
        )}
      </div>
    </div>
  );
}

export default Address;

