"use client";
import React from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "./filter";
import { TaxTypeFilter } from "./tax-type.filter";
import { clearFilter, filterSearchText } from "@/service/datatable.service";
import { DataTableViewOptions } from "@/components/data-table/components/data-table-view-options";
import { ValueTypeFilter } from "./value-type.filter";

interface ToolbarProps {
  table: Table<any>;
  isFilterEnable: boolean;
  trans: any;
}

export function Toolbar({ table, isFilterEnable, trans }: ToolbarProps) {
  const statusOptions = [
    {
      value: "true",
      label: trans("Active"),
    },
    {
      value: "false",
      label: trans("Inactive"),
    },
  ];

  const taxTypeOptions = [
    {
      value: "FEE_AND_CHARGES",
      label: trans("FEE_AND_CHARGES"),
    },
    {
      value: "TAX",
      label: trans("TAX"),
    },
  ];

  const valueTypeOptions = [
    {
      value: "FIXED",
      label: trans("FIXED"),
    },
    {
      value: "PERCENT",
      label: trans("PERCENT"),
    },
  ];

  const viewOptionLabel = {
    tax_name: trans("Tax Name"),
    description: trans("Description"),
    tax_type: trans("Tax Type"),
    value_type: trans("Value Type"),
    tax_value: trans("Tax Value"),
    is_active: trans("Status"),
    created_at: trans("Created At"),
    updated_at: trans("Updated At"),
  };

  //Function to handel global filter
  const handleFilterChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      await filterSearchText(event.target.value);
      if (!event.target.value) {
        await handelResetFilter();
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  //Function to handel reset filter
  const handelResetFilter = async () => {
    try {
      await clearFilter();
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="flex flex-1 flex-wrap items-center gap-2">
      <Input
        placeholder={trans("Search") + "..."}
        onChange={handleFilterChange}
        className="h-8 min-w-[200px] max-w-sm"
      />
      {taxTypeOptions.length && (
        <TaxTypeFilter title={trans("Tax Type")} options={taxTypeOptions} />
      )}

      {valueTypeOptions.length && (
        <ValueTypeFilter title={trans("Value Type")} options={valueTypeOptions} />
      )}

      {statusOptions.length && (
        <Filter title={trans("Status")} options={statusOptions} />
      )}

      {isFilterEnable && (
        <Button
          variant="outline"
          onClick={handelResetFilter}
          className="h-8 px-2 lg:px-3"
        >
          {trans("Reset")}
          <X className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
        </Button>
      )}
      <DataTableViewOptions
        trans={trans}
        table={table}
        optionLabel={viewOptionLabel}
      />
    </div>
  );
}
