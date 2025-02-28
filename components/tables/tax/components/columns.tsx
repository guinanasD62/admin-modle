"use client";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "./column-header";
import { RowActions } from "./actions";
import { formatDate } from "@/utils/date";
import { useState } from "react";
import { toggleTax } from "@/service/tax.service";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";

interface Tax {
  uuid?: string;
  tax_name: string;
  description: string;
  tax_type: string;
  value_type: string;
  tax_value: string;
  is_active?: string;
  created_at?: string;
  updated_at?: string;
}

export const columns: ColumnDef<Tax>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tax_name",
    header: ({ column }) => <ColumnHeader column={column} title="Tax Name" />,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("tax_name")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "tax_type",
    header: ({ column }) => <ColumnHeader column={column} title="Tax Type" />,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("tax_type")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
  },
  {
    accessorKey: "value_type",
    header: ({ column }) => <ColumnHeader column={column} title="Value Type" />,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("value_type")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
  },
  {
    accessorKey: "tax_value",
    header: ({ column }) => <ColumnHeader column={column} title="Tax Value" />,
    cell: ({ row }) => {
      const value_type :any=row.original.value_type;
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("tax_value")+`${value_type==="PERCENT"?"%":""}`}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <ColumnHeader column={column} title="Created At" />,
    cell: ({ row }) => {
      const created_at: any = row?.original?.created_at;
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
          {created_at ? formatDate(created_at) : "N/A"}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => <ColumnHeader column={column} title="Updated At" />,
    cell: ({ row }) => {
      const updated_at: any = row?.original?.updated_at;
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
          {updated_at ? formatDate(updated_at) : "N/A"}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const [activate, setActivate] = useState<boolean>(row.getValue('is_active'))
      const handleToggle = async (uuid: any) => {
        try {
          const newActivate = !activate;
          try {
            // Call the API with the updated value of activate
            const payload = {
              uuid: uuid,
              is_active: newActivate,
            };

            const response = await toggleTax(payload);
            if (response?.status !== true || response?.statusCode !== 200) {
              setActivate(!newActivate);
              // Show error if the status update fails
              toast.error(response?.message || "Failed to update status.");
            } else {
              // Update state only if API call succeeds
              setActivate(newActivate);
              toast.success(
                response?.message || "Status updated successfully."
              );
            }
          } catch (error: any) {
            // Show error message and do not change the switch state.
            toast.error(error?.message || "An error occurred.");
          }
        } catch (error: any) {
          toast.error(error?.message);
        }
      };
      return (
        <div className="flex items-center">
          <div className="flex items-center gap-2">
          <Switch
              color="success"
              size="lg"
              id="switch_success"
              checked={activate}
              onCheckedChange={() => {
                handleToggle(row.original.uuid);
              }}
            />
          </div>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "action",
    header: ({ column }) => <ColumnHeader column={column} title="Action" />,
    cell: ({ row }) => <RowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];
