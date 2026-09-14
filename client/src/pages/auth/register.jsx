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
          title: data?.message || "Registration successful",
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.message || "Registration failed",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full space-y-6">
      <div className="space-y-2">
        <span className="inline-block text-[11px] font-bold tracking-widest text-slate-400 uppercase bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700/50">
          Exclusive Membership
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Create Account
        </h1>
        <p className="text-sm text-slate-400 font-normal">
          Already have an account?{" "}
          <Link
            className="font-medium text-white hover:text-slate-300 underline underline-offset-4 transition-colors"
            to="/auth/login"
          >
            Sign in
          </Link>
        </p>
      </div>
      
      <div>
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Create Account"}
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

