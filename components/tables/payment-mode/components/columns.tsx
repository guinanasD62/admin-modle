"use client";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "./column-header";
import { RowActions } from "./actions";
import { formatDate } from "@/utils/date";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getS3BasePath } from "@/config/aws";
import { togglePaymentMode } from "@/service/payment-mode.service";
import netBanking from "../../../../public/images/payment-mode/netbanking.png";
import upi from "../../../../public/images/payment-mode/UPI.png";
import card from "../../../../public/images/payment-mode/Card.png";
import wallets from "../../../../public/images/payment-mode/wallet.png";

interface PaymentMode {
  uuid?: string;
  payment_methods?: string;
  payment_providers?: string[];
  image?: string;
  is_active?: boolean;
  slug?: string;
  created_at: string;
  updated_at: string;
}

const AWS_URL = getS3BasePath();

export const columns: ColumnDef<PaymentMode>[] = [
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
    accessorKey: "Images",
    header: ({ column }) => <ColumnHeader column={column} title="Image" />,
    cell: ({ row }) => {
      const uuid = row?.original?.uuid;
      const payment_methods = row?.getValue("payment_methods") as string;
      let imageSrc: any;

      switch (payment_methods) {
        case "UPI":
          imageSrc = upi;
          break;
        case "CARD":
          imageSrc = card;
          break;
        case "NETBANKING":
          imageSrc = netBanking;
          break;
        case "WALLETS":
          imageSrc = wallets;
          break;
      }

      return (
        <div className="flex gap-2 items-center">
          <Image
            className="w-8 h-8 rounded-[100%]"
            src={imageSrc}
            width={500}
            height={300}
            alt={payment_methods || "Payment Mode Image"}
          />
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "payment_methods",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Payment Methods" />
    ),
    cell: ({ row }) => {
      const uuid = row?.original?.uuid;
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            <Link
              href={`/setting/payment-mode/${uuid}`}
              className="text-blue-600 hover:underline"
            >
              {row.getValue("payment_methods")}
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

            const response = await togglePaymentMode(payload);
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
