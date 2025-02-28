"use client";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "./column-header";
import { formatDate } from "@/utils/date";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getS3BasePath } from "@/config/aws";
import { getInitials } from "@/utils/general";
import Link from "next/link";

interface Order {
  order_number: string;
  transaction_id: string;
  status: string;
}

interface ProductCategory {
  category_name: string;
}

interface Product {
  title: string;
  description: string;
  category: ProductCategory;
  image: string;
  user_id: number;
}

interface OrderItem {
  id: number;
  uuid: string;
  order: Order;
  product: Product;
  quantity: number;
  price: number;
  status: string;
  created_at: string; // Use `Date` if you plan to convert it to a Date object
}

const AWS_URL = getS3BasePath();

export const columns: ColumnDef<OrderItem>[] = [
  {
    accessorKey: "order_number",
    header: ({ column }) => <ColumnHeader column={column} title="Order ID" />,
    cell: ({ row }) => {
      const uuid = row?.original?.uuid;
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
          <Link
              href={`/order/details?order-item-number=${uuid}`}
              className="text-blue-600 hover:underline"
            >
              {row?.original?.order?.order_number}
            </Link>
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
    accessorKey: "product_title",
    header: ({ column }) => <ColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const productTitle = row?.original?.product?.title;
      const image: any = row?.original?.product?.image;
      const user_id: any = row?.original?.product?.user_id;
      return (
        <div className="flex gap-2 items-center">
          <div className="font-medium text-card-foreground/80">
            <div className="flex space-x-3 rtl:space-x-reverse items-center">
              <Avatar className="rounded-lg">
                {image && (
                  <AvatarImage
                    src={AWS_URL + `/products/${user_id}/` + image}
                  />
                )}
                <AvatarFallback>{productTitle && getInitials(productTitle)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <span className="max-w-[500px] truncate font-medium">
            {productTitle || "Unknow Product"}
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
    accessorKey: "product_category",
    header: ({ column }) => <ColumnHeader column={column} title="Category" />,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row?.original?.product?.category?.category_name}
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
    accessorKey: "price",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Price(price per product)" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("price")}
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
    accessorKey: "quantity",
    header: ({ column }) => <ColumnHeader column={column} title="Quantity" />,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("quantity")}
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
    accessorKey: "created_at",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Ordered Date" />
    ),
    cell: ({ row }) => {
      const created_at: any = row?.original?.created_at;
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
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <ColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Badge variant="soft">{row.getValue("status")}</Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
  },
];
