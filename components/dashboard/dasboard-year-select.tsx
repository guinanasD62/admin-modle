"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DashboardYearSelectProps {
  onYearChange: (year: number) => void;
}
const DashboardYearSelect: React.FC<DashboardYearSelectProps> = ({
  onYearChange,
}) => {
  // Function to get an array of years from 2020 to the current year
  const getYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 2020; year--) {
      years.push(year);
    }
    return years;
  };

  const handleYearSelect = (value: string) => {
    onYearChange(parseInt(value));
  };

  return (
    <Select onValueChange={handleYearSelect}>
      <SelectTrigger className="w-[150px]">
        {" "}
        {/* Uniform width */}
        <SelectValue
          placeholder={new Date().getFullYear().toString()}
          className="whitespace-nowrap"
        />
      </SelectTrigger>
      <SelectContent className="w-[150px] max-h-60 overflow-y-auto">
        {" "}
        {/* Match Trigger width */}
        {getYears().map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DashboardYearSelect;
