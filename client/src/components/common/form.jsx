import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
  isLoading,
  isLight = false,
}) {
  const [showPasswords, setShowPasswords] = useState({});

  const toggleShowPassword = (name) => {
    setShowPasswords((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    const inputClasses = isLight 
      ? "h-11 rounded-xl border-slate-200 focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all bg-white font-normal text-slate-900 placeholder:text-slate-400 text-sm shadow-sm"
      : "h-11 rounded-xl border-slate-800 hover:border-slate-700 focus:ring-2 focus:ring-white/10 focus:border-slate-400 transition-all bg-slate-950/70 font-normal text-white placeholder:text-slate-500 text-sm shadow-inner";

    switch (getControlItem.componentType) {
      case "input":
        if (getControlItem.type === "password") {
          const isShown = Boolean(showPasswords[getControlItem.name]);
          element = (
            <div className="relative">
              <Input
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
                id={getControlItem.name}
                type={isShown ? "text" : "password"}
                value={value}
                className={`${inputClasses} pr-11`}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    [getControlItem.name]: event.target.value,
                  })
                }
              />
              <button
                type="button"
                onClick={() => toggleShowPassword(getControlItem.name)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors focus:outline-none p-1"
                aria-label={isShown ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {isShown ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          );
        } else {
          element = (
            <Input
              name={getControlItem.name}
              placeholder={getControlItem.placeholder}
              id={getControlItem.name}
              type={getControlItem.type}
              value={value}
              className={inputClasses}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: event.target.value,
                })
              }
            />
          );
        }
        break;

      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className={`w-full h-11 rounded-xl font-normal text-sm ${
              isLight 
                ? "border-slate-200 bg-white text-slate-800 focus:ring-slate-900/10 focus:border-slate-900" 
                : "border-slate-800 bg-slate-950/70 text-slate-200 focus:ring-white/10 focus:border-slate-400"
            }`}>
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent className={`rounded-xl shadow-2xl p-1 ${
              isLight 
                ? "border border-slate-200 bg-white text-slate-800" 
                : "border border-slate-800 bg-slate-900 text-slate-100"
            }`}>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem 
                        key={optionItem.id} 
                        value={optionItem.id}
                        className={`rounded-lg p-2.5 cursor-pointer font-medium text-xs transition-colors ${
                          isLight 
                            ? "text-slate-700 hover:bg-slate-100 focus:bg-slate-100 focus:text-slate-900" 
                            : "text-slate-200 hover:bg-slate-800 focus:bg-slate-800 focus:text-white"
                        }`}
                    >
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            className={`${inputClasses} min-h-[100px] py-3 resize-none`}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            className={inputClasses}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className={`text-xs font-semibold px-0.5 ${isLight ? "text-slate-700" : "text-slate-300"}`}>
              {controlItem.label}
            </Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button 
        disabled={isBtnDisabled} 
        isLoading={isLoading}
        type="submit" 
        className={`mt-6 w-full h-11 py-2.5 rounded-xl font-bold text-sm tracking-wide shadow-md transition-all active:scale-[0.99] disabled:opacity-50 ${
          isLight 
            ? "bg-slate-900 hover:bg-slate-800 text-white" 
            : "bg-white hover:bg-slate-100 text-slate-950 hover:shadow-lg hover:shadow-white/5"
        }`}
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
