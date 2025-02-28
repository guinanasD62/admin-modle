"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ColumnHeader } from "./column-header";
import { formatDate } from "@/utils/date";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/general";
import { getS3BasePath } from "@/config/aws";
import { RowActions } from "./action";
import Link from "next/link";

interface ProductImage {
  original_image: string;
  optimized_image: string;
  thumbnail_image: string;
}

interface Category {
  category_name: string;
}

interface Brand {
  brand_name: string;
}

interface Product {
  id: number;
  uuid: string;
  is_parent: boolean;
  category_id: number;
  category: Category;
  brand_id: number;
  brand: Brand;
  title: string;
  price: string;
  step_completed: number;
  slug: string;
  product_images: ProductImage[];
  user_id: string;
  created_at: string;
  updated_at: string;
}

const AWS_URL = getS3BasePath();

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => <ColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      const title = row.getValue("title");
      let productImages: ProductImage[] = row.original.product_images;
      const user_id: any = row?.original?.user_id;
      let thumbnailImage =
        productImages && productImages.length > 0
          ? productImages[0].thumbnail_image
          : null;
      const slug = row?.original?.slug;
      return (
        <div className="flex gap-3 items-center">
          <Avatar className="rounded-lg">
            {thumbnailImage && (
              <AvatarImage
                src={AWS_URL + `/products/${user_id}/` + thumbnailImage}
              />
            )}
            <AvatarFallback>{title ? getInitials(title) : "?"}</AvatarFallback>
          </Avatar>
          <span className="text-sm  text-default-600">
            <Link href={`/product/details?slug=${slug}`} className="text-blue-600 hover:underline">{row.getValue("title")}</Link>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => <ColumnHeader column={column} title="Category" />,
    cell: ({ row }) => {
      let categoryObj: any = row.getValue("category");
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {categoryObj?.category_name}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "brand",
    header: ({ column }) => <ColumnHeader column={column} title="Brand" />,
    cell: ({ row }) => {
      let brandObj: any = row.getValue("brand");
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {brandObj?.brand_name}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => <ColumnHeader column={column} title="Price" />,
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
    enableHiding: false,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <ColumnHeader column={column} title="Created At" />,
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
            {updated_at ? formatDate(updated_at) : ""}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => <ColumnHeader column={column} title="Status" className="flex gap-2"/>,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Badge
            variant="soft"
            color={
              (row.getValue("is_active") === true && "success") ||
              (row.getValue("is_active") === false && "destructive") ||
              "default"
            }
          >
            {row.getValue("is_active") === true ? "Active" : "Inactive"}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
];
