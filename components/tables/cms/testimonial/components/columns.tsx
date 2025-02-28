"use client";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "./column-header";
import { RowActions } from "./actions";
import { formatDate } from "@/utils/date";
import { useState } from "react";
import { toggleTestimonials } from "@/service/testimonial.service";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";

interface Testimonial {
  uuid?: string;
  customer_name: string;
  designation: string;
  rating: string;
  review: string;
  source_name: string;
  company_name: string;
  location_city: string;
  title: string;
  is_active?: string;
  created_at: string;
  updated_at: string
}

export const columns: ColumnDef<Testimonial>[] = [
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
    accessorKey: "customer_name",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Customer Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("customer_name")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "designation",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Designation" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("designation")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => <ColumnHeader column={column} title="Rating" />,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("rating")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "review",
    header: ({ column }) => <ColumnHeader column={column} title="Review" />,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("review")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "source_name",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Source Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("source_name")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "company_name",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Company Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("company_name")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => <ColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "location_city",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Location City" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("location_city")}
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

            const response = await toggleTestimonials(payload);
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
