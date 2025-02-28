"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { fetchCategoryDropdown } from "@/service/category.service";
import { Loader2 } from "lucide-react";

interface DashboardCategorySelectProps {
  onCategoryChange: (categoryId: string) => void;
}

interface Category {
  uuid: string;
  category_name: string;
}

const DashboardCategorySelect: React.FC<DashboardCategorySelectProps> = ({
  onCategoryChange,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] =
    useState<string>("Category");

  // Function to fetch category dropdown data
  const loadCategoryDropdown = async () => {
    try {
      const response = await fetchCategoryDropdown();
      if (response.status) {
        setCategories(response.data);
        if (response.data.length > 0) {
          const firstCategory = response.data[0];
          setSelectedCategory(firstCategory.uuid);
          setSelectedCategoryName(firstCategory.category_name);
          onCategoryChange(firstCategory.uuid);
        }
      }
    } catch (error) {
      console.error("Error fetching category dropdown", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategoryDropdown();
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    const selectedCategoryObj = categories.find(
      (category: Category) => category.uuid === categoryId
    );
    setSelectedCategory(categoryId);
    if (selectedCategoryObj) {
      setSelectedCategoryName(selectedCategoryObj.category_name);
    }
    onCategoryChange(categoryId);
  };

  return (
    <Select onValueChange={handleCategorySelect}>
      <SelectTrigger className="w-[150px]">
        {" "}
        <SelectValue
          placeholder={selectedCategoryName || "Select Category"}
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
          categories.map((category: any) => (
            <SelectItem key={category.uuid} value={String(category.uuid)}>
              {category.category_name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default DashboardCategorySelect;
