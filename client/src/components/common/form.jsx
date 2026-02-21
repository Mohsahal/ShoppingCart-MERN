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
}) {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    const inputClasses = "py-6 rounded-xl border-slate-200 focus:ring-primary focus:border-primary transition-all bg-white font-medium text-slate-700 placeholder:text-slate-300";

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
            <SelectTrigger className="w-full h-14 rounded-xl border-slate-200 focus:ring-primary focus:border-primary font-medium text-slate-700">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-none shadow-2xl p-2">
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem 
                        key={optionItem.id} 
                        value={optionItem.id}
                        className="rounded-lg p-3 cursor-pointer font-bold text-slate-600 focus:bg-primary/5 focus:text-primary transition-colors"
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
            className={`${inputClasses} min-h-[120px] py-4 resize-none`}
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
      <div className="flex flex-col gap-6">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-2.5" key={controlItem.name}>
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button 
        disabled={isBtnDisabled} 
        type="submit" 
        className="mt-10 w-full py-8 rounded-2xl font-black text-lg tracking-tighter uppercase shadow-xl shadow-primary/20 transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:transform-none"
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
