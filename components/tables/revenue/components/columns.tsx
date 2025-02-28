"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "./column-header";
import Link from "next/link";

interface Revenue {
  seller_id: number;
  uuid: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  total_trexo_earning: number;
  total_seller_earning: number;
  order_count: number;
  revenue_percentage: number;
  categories: string[];
}

export const columns: ColumnDef<Revenue>[] = [
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
    accessorKey: "seller_name",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Seller Name" />
    ),
    cell: ({ row }) => {
      const firstName = row?.original?.first_name;
      const middleName = row?.original?.middle_name;
      const lastName = row?.original?.last_name;
      const fullName = [firstName, middleName, lastName]
        .filter((name) => name && name.trim() !== "")
        .join(" ");
      const uuid = row?.original?.uuid;
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            <Link href={`/users/seller/${uuid}/info`} className="text-blue-600 hover:underline">{fullName}</Link>
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => <ColumnHeader column={column} title="Category" />,
    cell: ({ row }) => {
      const categoryNames =
        row?.original?.categories?.length > 0
          ? row.original.categories.join(",")
          : "N/A";
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {categoryNames}
          </span>
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
    accessorKey: "seller_revenue",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Seller Revenue" />
    ),
    cell: ({ row }) => {
      const sellersRevenue = row?.original?.revenue_percentage
        ? row?.original?.revenue_percentage
        : 0;
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {sellersRevenue + "%"}
          </span>
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
    accessorKey: "total_seller_earning",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Total Seller Earning" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {"₹" + row.getValue("total_seller_earning")}
          </span>
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
    accessorKey: "trexo_revenue",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Trexo Revenue" />
    ),
    cell: ({ row }) => {
      const revenuePercentage = row.original.revenue_percentage || 0;
      // Calculate Trexo Revenue
      const trexoRevenue = 100 - revenuePercentage;
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {trexoRevenue + "%"}
          </span>
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
    accessorKey: "total_trexo_earning",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Total Trexo Earning" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {"₹" + row.getValue("total_trexo_earning")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: true,
  },
];
