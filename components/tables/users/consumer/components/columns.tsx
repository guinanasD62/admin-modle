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
import {
  fetchSellerEmailById,
  fetchSellerMobileNumberById,
  toggleUser,
} from "@/service/user.service";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";

interface Consumer {
  uuid?: string;
  id: number;
  profile_url: string;
  unique_id: string;
  name: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  is_active?: string;
  created_at: string;
  status: string;
}

const AWS_URL = getS3BasePath();

export const columns: ColumnDef<Consumer>[] = [
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
              href={`/users/consumer/${uuid}/basic-details`}
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
    accessorKey: "uuid",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Mobile Number" />
    ),
    cell: ({ row }) => {
      const [mobileNumber, setMobileNumber] = React.useState<string | null>(null);
      const [mobileNumberVisible, setMobileNumberVisible] = React.useState(false);

      React.useEffect(() => {
        const fetchMobileNumber = async () => {
          if (mobileNumberVisible) {
            const response = await fetchSellerMobileNumberById(row.original.uuid);
            const number = response.data.mobile_number;
            // Add a space between the country code and the phone number
            const formattedNumber = `${number.slice(0, 3)} ${number.slice(3)}`;
            setMobileNumber(formattedNumber);
          } else {
            setMobileNumber(null);
          }
        };
        fetchMobileNumber();
      }, [mobileNumberVisible, row.original.uuid]);

      const handleMobileNumberClick = () => {
        setMobileNumberVisible(!mobileNumberVisible);
      };

      return (
        <div className="flex gap-2">
          {mobileNumberVisible ? (
            <span className="max-w-[500px] truncate font-medium">
              {mobileNumber}
            </span>
          ) : (
            <span className="max-w-[500px] truncate font-medium">
              *********
            </span>
          )}
          <Icon
            icon={mobileNumberVisible ? "heroicons:eye" : "heroicons:eye-slash"}
            className="w-4 h-4 text-default-400"
            onClick={handleMobileNumberClick}
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
      const [emailId, setEmailId] = React.useState(null);
      const [emailIdVisible, setEmailIdVisible] = React.useState(false);

      React.useEffect(() => {
        const fetchEmailId = async () => {
          if (emailIdVisible) {
            const response = await fetchSellerEmailById(row.original.uuid);
            setEmailId(response.data.email);
          } else {
            setEmailId(null);
          }
        };
        fetchEmailId();
      }, [emailIdVisible, row.original.uuid]);

      const handleMobileNumberClick = () => {
        setEmailIdVisible(!emailIdVisible);
      };

      return (
        <div className="flex gap-2">
          {emailIdVisible ? (
            <span className="max-w-[500px] truncate font-medium">
              {emailId}
            </span>
          ) : (
            <span className="max-w-[500px] truncate font-medium">
              *********
            </span>
          )}
          <Icon
            icon={emailIdVisible ? "heroicons:eye" : "heroicons:eye-slash"}
            className="w-4 h-4 text-default-400"
            onClick={handleMobileNumberClick}
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
      const created_at = row?.original?.created_at;
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {created_at ? formatDate(created_at) : ""}
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

            const response = await toggleUser(payload);
            if (response?.status !== true || response?.statusCode !== 200) {
              setActivate(!newActivate);
              toast.error(response?.message || "Failed to update status.");
            } else {
              setActivate(newActivate);
              toast.success(
                response?.message || "Status updated successfully."
              );
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
  },
  {
    id: "action",
    header: ({ column }) => <ColumnHeader column={column} title="Action" />,
    cell: ({ row }) => <RowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];
