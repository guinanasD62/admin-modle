"use client";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "./column-header";
import { RowActions } from "./actions";
import { formatDate } from "@/utils/date";
import { useState } from "react";
import { toggleFaq } from "@/service/faq.service";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";

interface FAQ {
  uuid?: string;
  question?: string;
  faq_type?: string;
  faq_category: string;
  created_at: string;
  updated_at: string;
}

export const columns: ColumnDef<FAQ>[] = [
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
    accessorKey: "question",
    header: ({ column }) => <ColumnHeader column={column} title="Question" />,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("question")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "faq_category",
    header: ({ column }) => (
      <ColumnHeader column={column} title="FAQ Category" />
    ),
    cell: ({ row }) => {
      let faqObj: any = row.getValue("faq_category");
      if (faqObj?.category_name) {
        return (
          <div className="flex gap-2">
            <span className="max-w-[500px] truncate font-medium">
              {faqObj.category_name}
            </span>
          </div>
        );
      }
    },
  },
  {
    accessorKey: "faq_type",
    header: ({ column }) => <ColumnHeader column={column} title="FAQ Type" />,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("faq_type")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
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

            const response = await toggleFaq(payload);
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
    // header: "Action",
    header: ({ column }) => <ColumnHeader column={column} title="Action" />,
    cell: ({ row }) => <RowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];