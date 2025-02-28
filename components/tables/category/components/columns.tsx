"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnHeader } from "./column-header";
import { RowActions } from "./actions";
import { formatDate } from "@/utils/date";
import Image from "next/image";
import { getS3BasePath } from "@/config/aws";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { toggleCategory } from "@/service/category.service";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";
import { getInitials } from "@/utils/general";

interface Industry {
  id: string;
  uuid: string;
  industry: string;
  category: string;
  status: string;
  image: string;
  created_at: string;
  updated_at: string;
}

const AWS_URL = getS3BasePath();

export const columns: ColumnDef<Industry>[] = [
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
    accessorKey: "category_name",
    header: ({ column }) => <ColumnHeader column={column} title="Category" />,
    cell: ({ row }) => {
      const categoryName = row.getValue("category_name") as string;
      if (row.getValue("category_name")) {
        return (
          <div className="flex gap-2 items-center">
            <Avatar className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <AvatarImage
                src={`${AWS_URL}/category/${row.original.id}/small/${row.original.image}`}
              />
              <AvatarFallback>
                {categoryName ? getInitials(categoryName) : "?"}
              </AvatarFallback>
            </Avatar>
            <span className="max-w-[500px] truncate font-medium">
              {categoryName || "Unknown Category"}
            </span>
          </div>
        );
      }
      return "N/A";
    },
  },
  {
    accessorKey: "industry",
    header: ({ column }) => <ColumnHeader column={column} title="Industry" />,
    cell: ({ row }) => {
      let industryObj: any = row.getValue("industry");
      if (industryObj?.industry_name) {
        return (
          <div className="flex gap-2">
            <span className="max-w-[500px] truncate font-medium">
              {industryObj.industry_name}
            </span>
          </div>
        );
      }
      return "N/A";
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
    enableSorting: true,
    enableHiding: false,
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
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => <ColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const [activate, setActivate] = useState<boolean>(
        row.getValue("is_active")
      );
      const handleToggle = async (uuid: any) => {
        try {
          const newActivate = !activate;
          try {
            // Call the API with the updated value of activate
            const payload = {
              uuid: uuid,
              is_active: newActivate,
            };

            const response = await toggleCategory(payload);
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
    id: "actions",
    header: ({ column }) => <ColumnHeader column={column} title="Action" />,
    cell: ({ row }) => <RowActions row={row} />,
  },
];
