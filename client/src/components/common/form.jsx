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
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    const inputClasses = isLight 
      ? "h-11 rounded-xl border-slate-200 focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all bg-white font-normal text-slate-900 placeholder:text-slate-400 text-sm shadow-sm"
      : "h-11 rounded-xl border-slate-800 focus:ring-2 focus:ring-white/20 focus:border-slate-500 transition-all bg-slate-900/90 font-normal text-white placeholder:text-slate-500 text-sm shadow-inner";

    switch (getControlItem.componentType) {
      case "input":
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
                : "border-slate-800 bg-slate-900/90 text-slate-200 focus:ring-white/20 focus:border-slate-500"
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
        className={`mt-6 w-full h-11 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all disabled:opacity-50 ${
          isLight 
            ? "bg-slate-900 hover:bg-slate-800 text-white" 
            : "bg-white hover:bg-slate-200 text-slate-950"
        }`}
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;


