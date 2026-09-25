import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-bone-50 rounded-3xl shadow-sm border border-bone-200 overflow-hidden h-full flex flex-col">
      <div className="p-4 sm:p-6 border-b border-bone-200 bg-bone-100/70">
        <h2 className="text-lg sm:text-xl font-bold text-bone-950 tracking-tight">Catalyst Filters</h2>
        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">Refine your search</p>
      </div>
      <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-bone-200">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-bone-950 uppercase tracking-wider">{keyItem}</h3>
              <div className="grid gap-3">
                {filterOptions[keyItem].map((option) => (
                  <Label 
                    key={option.id}
                    className="flex items-center gap-3 cursor-pointer group p-2 rounded-xl hover:bg-bone-100 transition-colors"
                  >
                    <Checkbox
                      className="border-bone-300 data-[state=checked]:bg-bone-900 data-[state=checked]:border-bone-900 transition-all rounded-md"
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    <span className={`text-sm font-semibold transition-colors ${
                        filters?.[keyItem]?.indexOf(option.id) > -1 ? "text-bone-950 font-bold" : "text-stone-600 group-hover:text-bone-950"
                    }`}>
                        {option.label}
                    </span>
                  </Label>
                ))}
              </div>
            </div>
            <Separator className="bg-bone-200" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
