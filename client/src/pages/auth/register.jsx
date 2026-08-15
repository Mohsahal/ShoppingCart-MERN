import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/auth-context";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    registerUser(formData).then((data) => {
      setIsLoading(false);
      if (data?.success) {
        toast({
          title: data?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-8 p-10 bg-white">
      <div className="space-y-2 relative z-10">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase leading-none">
          Create <span className="text-primary italic">Account</span>
        </h1>
        <p className="text-slate-500 font-medium">
          Already have an account?
          <Link
            className="font-black ml-2 text-primary hover:underline uppercase tracking-wider text-xs transition-all"
            to="/auth/login"
          >
            Login Here
          </Link>
        </p>
      </div>
      
      <div className="relative z-10 mt-8">
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default AuthRegister;
