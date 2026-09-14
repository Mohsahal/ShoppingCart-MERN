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
    <div className="mx-auto w-full space-y-6">
      <div className="space-y-2">
        <span className="inline-block text-[11px] font-bold tracking-widest text-slate-400 uppercase bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700/50">
          Member Access
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Sign In
        </h1>
        <p className="text-sm text-slate-400 font-normal">
          Don't have an account?{" "}
          <Link
            className="font-medium text-white hover:text-slate-300 underline underline-offset-4 transition-colors"
            to="/auth/register"
          >
            Create an account
          </Link>
        </p>
      </div>
      
      <div>
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

