import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "@/context/auth-context";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useContext(AuthContext);
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    loginUser(formData).then((data) => {
      setIsLoading(false);
      if (data?.success) {
        toast({
          title: data?.message || "Logged in successfully",
        });
      } else {
        toast({
          title: data?.message || "Failed to log in",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Sign In
        </h1>
        <p className="text-sm text-slate-500 font-normal">
          Don't have an account?{" "}
          <Link
            className="font-semibold text-slate-900 hover:underline"
            to="/auth/register"
          >
            Create an account
          </Link>
        </p>
      </div>
      
      <div className="pt-2">
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default AuthLogin;
