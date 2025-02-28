"use client";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "./column-header";
import { RowActions } from "./actions";
import { formatDate } from "@/utils/date";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { getInitials } from "@/utils/general";
import { getS3BasePath } from "@/config/aws";

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
  image:string;
  user_id:number;
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

export const columns: (sellerMeta: any) => ColumnDef<OrderItem>[] = (
  sellerMeta
) => [
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
    accessorKey: "order_number",
    header: ({ column }) => <ColumnHeader column={column} title="Order ID" />,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row?.original?.order?.order_number}
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
    enableSorting: true,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Price (price per product)" />
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
    enableSorting: true,
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
    enableSorting: true,
  },
  {
    accessorKey: "seller",
    header: ({ column }) => <ColumnHeader column={column} title="Seller" />,
    cell: ({ row }) => {
      const user_id: any = row?.original?.product?.user_id;
       const seller_name = user_id ? sellerMeta[user_id]:""
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {seller_name}
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
    enableHiding: true,
  },
];
