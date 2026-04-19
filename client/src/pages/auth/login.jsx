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
          title: data?.message,
        });
      } else {
        toast({
          title: data?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-10 py-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">
          Welcome <span className="text-primary italic">Back</span>
        </h1>
        <p className="text-slate-500 font-medium">
          Don't have an account?
          <Link
            className="font-black ml-2 text-primary hover:underline uppercase tracking-wider text-xs"
            to="/auth/register"
          >
            Register Now
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}

export default AuthLogin;
