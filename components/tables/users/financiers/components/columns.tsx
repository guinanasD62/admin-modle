"use client";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "./column-header";
import { RowActions } from "./actions";
import { formatDate } from "@/utils/date";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { getS3BasePath } from "@/config/aws";
import { getInitials } from "@/utils/general";
import { useState } from "react";
import { toggleFinancier } from "@/service/user.service";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";

interface Financer {
  uuid?: string;
  id?: number;
  profile_url: string;
  unique_id: string;
  name: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  status?: string;
}

const AWS_URL = getS3BasePath();

export const columns: ColumnDef<Financer>[] = [
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
    accessorKey: "unique_id",
    header: ({ column }) => <ColumnHeader column={column} title="Id" />,
    cell: ({ row }) => {
      const uuid = row?.original?.uuid;
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            <Link
              href={`/users/financier/${uuid}/business-details`}
              className="text-blue-600 hover:underline"
            >
              {row.getValue("unique_id")}
            </Link>
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const firstName = row?.original?.first_name;
      const middleName = row?.original?.middle_name;
      const lastName = row?.original?.last_name;
      const fullName = [firstName, middleName, lastName]
        .filter((name) => name && name.trim() !== "")
        .join(" ");
      const profile_url: any = row.getValue("profile_url");
      const logo = row?.original?.first_name?.split("")[0];
      return (
        <div className="flex gap-2 items-center">
          <div className="font-medium text-card-foreground/80">
            <div className="flex space-x-3 rtl:space-x-reverse items-center">
              <Avatar className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <AvatarImage
                  src={`${AWS_URL}/user/${row.original.id}/${row.original.profile_url}`}
                />
                <AvatarFallback>
                  {fullName ? getInitials(fullName) : "?"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <span className="max-w-[500px] truncate font-medium">{fullName}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "mobile_number",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Mobile Number" />
    ),
    cell: ({ row }) => {
      const mobile_number = row.getValue("mobile_number");
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">**********</span>
          <Icon
            icon="heroicons:eye-slash"
            className="w-4 h-4 text-default-400"
          />
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => <ColumnHeader column={column} title="Email" />,
    cell: ({ row }) => {
      const email = row.getValue("email");
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">**********</span>
          <Icon
            icon="heroicons:eye-slash"
            className="w-4 h-4 text-default-400"
          />
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
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {formatDate(row.getValue("created_at"))}
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
    accessorKey: "status",
    header: ({ column }) => <ColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const [activate, setActivate] = useState<boolean>(
        row.getValue("status") === "ACTIVE"
      );

      const handleToggle = async (uuid: any) => {
        try {
          const newActivate = !activate;
          try {
            const payload = {
              uuid: uuid,
              status: newActivate ? "ACTIVE" : "INACTIVE",
            };

            const response = await toggleFinancier(payload);
            if (response?.status !== true || response?.statusCode !== 200) {
              setActivate(!newActivate);
              toast.error(response?.message || "Failed to update status.");
            } else {
              setActivate(newActivate);
              toast.success(response?.message || "Status updated successfully.");
            }
          } catch (error: any) {
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
  }
];
