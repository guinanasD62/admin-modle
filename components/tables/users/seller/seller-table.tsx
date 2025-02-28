import React, { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { columns } from "./components/columns";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/hooks";
import { fetchTableData } from "@/service/datatable.service";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Toolbar } from "./components/toolbar";
import { DataTable } from "@/components/data-table";

interface ITableProps {
  trans: any;
}

const SellerTable: React.FC<ITableProps> = ({ trans }) => {
  const { isLoading, data, isFilterEnable, filters, pagination } =
    useAppSelector((state: RootState) => state.datatable);
  const [categoryMeta, setCategoryMeta] = useState<Object>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isFilterEnabled, setIsFilterEnabled] = React.useState(false);
  const table = useReactTable({
    data,
    columns: columns(categoryMeta),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters
    },
    enableRowSelection: true,
    manualFiltering: true,
    manualSorting: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  useEffect(() => {
    handleFetchSeller();
  }, [
    filters.searchText,
    filters.is_active,
    filters.sortColumn,
    filters.sortBy,
    pagination.currentPage,
    pagination.perPage,
  ]);

  // Function to fetch seller data
  const handleFetchSeller = async () => {
    try {
      const datatablePayload = {
        url: "/seller",
        page_size: pagination.perPage,
        page: pagination.currentPage,
        searchText: filters.searchText,
        is_active: filters.is_active,
        sortBy: filters.sortBy,
        sortColumn: filters.sortColumn,
      };
      const response = await fetchTableData(datatablePayload);
      if (filters.searchText || filters.is_active) {
        setIsFilterEnabled(true);
      } else {
        setIsFilterEnabled(false);
      }
      if (response?.status !== true && response?.statusCode !== 200) {
        toast.error(response?.message);
      }
      setCategoryMeta(response?.data);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <Fragment>
      <div className="space-y-4">
        <Toolbar trans={trans} table={table} isFilterEnable={isFilterEnabled} />
        <DataTable trans={trans} isLoading={isLoading} tableObj={table} />
      </div>
    </Fragment>
  );
};

export default SellerTable;
