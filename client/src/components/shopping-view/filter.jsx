import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden h-full flex flex-col">
      <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">Catalyst Filters</h2>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Refine your search</p>
      </div>
      <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-100">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">{keyItem}</h3>
              <div className="grid gap-3">
                {filterOptions[keyItem].map((option) => (
                  <Label 
                    key={option.id}
                    className="flex items-center gap-3 cursor-pointer group p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <Checkbox
                      className="border-slate-200 data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all rounded-md"
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    <span className={`text-sm font-bold transition-colors ${
                        filters?.[keyItem]?.indexOf(option.id) > -1 ? "text-primary" : "text-slate-600 group-hover:text-slate-900"
                    }`}>
                        {option.label}
                    </span>
                  </Label>
                ))}
              </div>
            </div>
            <Separator className="bg-slate-100" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
