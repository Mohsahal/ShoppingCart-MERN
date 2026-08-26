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
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Create an Account
        </h1>
        <p className="text-sm text-slate-500 font-normal">
          Already have an account?{" "}
          <Link
            className="font-semibold text-slate-900 hover:underline"
            to="/auth/login"
          >
            Sign in
          </Link>
        </p>
      </div>
      
      <div className="pt-2">
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
