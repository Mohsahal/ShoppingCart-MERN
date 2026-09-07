import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { SlidersHorizontal } from "lucide-react";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-slate-900/90 rounded-2xl shadow-xl border border-slate-800/80 overflow-hidden h-full flex flex-col text-white backdrop-blur-xl">
      <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-white/10 text-white">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Filters</h2>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Refine catalog</p>
          </div>
        </div>
      </div>

      {/* Filter items with hidden scrollbar */}
      <div className="p-4 sm:p-5 space-y-6 overflow-y-auto flex-1 scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">{keyItem}</h3>
              <div className="grid gap-1.5">
                {filterOptions[keyItem].map((option) => {
                  const isChecked = filters &&
                    Object.keys(filters).length > 0 &&
                    filters[keyItem] &&
                    filters[keyItem].indexOf(option.id) > -1;

                  return (
                    <Label 
                      key={option.id}
                      className={`flex items-center gap-3 cursor-pointer group px-3 py-2 rounded-xl transition-all ${
                        isChecked ? "bg-white/10 text-white font-bold" : "hover:bg-slate-800/50 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Checkbox
                        className="border-slate-700 data-[state=checked]:bg-white data-[state=checked]:text-slate-950 data-[state=checked]:border-white transition-all rounded-md h-4 w-4"
                        checked={isChecked}
                        onCheckedChange={() => handleFilter(keyItem, option.id)}
                      />
                      <span className="text-xs tracking-wide">
                        {option.label}
                      </span>
                    </Label>
                  );
                })}
              </div>
            </div>
            <Separator className="bg-slate-800/80" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
