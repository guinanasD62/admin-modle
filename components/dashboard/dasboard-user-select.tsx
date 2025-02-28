"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { fetchSellerDropdown } from "@/service/dashboard.service";
import { Loader2 } from "lucide-react";

interface DashboardUserSelectProps {
  onSellerChange: (userId: string) => void;
}
interface Seller {
  id: string;
  first_name: string;
  last_name: string;
}
const DashboardUserSelect: React.FC<DashboardUserSelectProps> = ({
  onSellerChange = () => {},
}) => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);
  const [selectedSellerName, setSelectedSellerName] =
    useState<string>("Seller");

  // Function to fetch seller dropdown data
  const loadSellerDropdown = async () => {
    try {
      const response = await fetchSellerDropdown();
      if (response.status) {
        setSellers(response.data);
        if (response.data.length > 0) {
          // Set the first seller as the selected seller
          const firstSeller = response.data[0];
          setSelectedSeller(firstSeller.id);
          setSelectedSellerName(
            `${firstSeller.first_name} ${firstSeller.last_name}`
          );
          onSellerChange(firstSeller.id);
        }
      }
    } catch (error) {
      console.error("Error fetching seller dropdown", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSellerDropdown();
  }, []);

  const handleSellerSelect = (userId: string) => {
    const selectedSellerObj = sellers.find(
      (seller: any) => seller.id === userId
    );
    setSelectedSeller(userId); // Set the selected seller ID
    setSelectedSellerName(
      `${selectedSellerObj?.first_name} ${selectedSellerObj?.last_name}`
    ); // Set the selected seller name
    onSellerChange(userId); // Pass the selected seller ID to the parent
  };

  return (
    <Select onValueChange={handleSellerSelect}>
      <SelectTrigger className="w-[150px]">
        {" "}
        <SelectValue
          placeholder={selectedSellerName}
          className="whitespace-nowrap"
        />
      </SelectTrigger>
      <SelectContent className="w-[150px] max-h-60 overflow-y-auto">
        {" "}
        {loading ? (
          <div className="p-2 flex justify-center">
            <Loader2 className="animate-spin h-6 w-6" />
          </div>
        ) : (
          sellers.map((seller: any) => (
            <SelectItem key={seller.id} value={String(seller.id)}>
              {seller.first_name} {seller.last_name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default DashboardUserSelect;
