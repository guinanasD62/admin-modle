import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchCountryForDropdown } from "@/service/country.service";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";

interface IFormProps {
  trans: any;
  isPending: boolean;
  register?: any;
  control?: any;
  errors?: any;
}

const StateForm: React.FC<IFormProps> = ({
  trans,
  isPending,
  register,
  control,
  errors,
}) => {
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    handleFetchCountryForDropDown();
  }, []);

  // Function to fetch country for dropdown
  const handleFetchCountryForDropDown = async () => {
    try {
      const response = await fetchCountryForDropdown();
      setOptions(response.data);
      if (response?.status !== true && response?.statusCode !== 200) {
        toast.error(response?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  return (
    <>
      <ScrollArea className="h-full">
        <div className="space-y-5 mb-2">
          <div className="flex flex-col gap-2">
            <Label>
              {trans("Country")}
              <span className="text-destructive">*</span>
            </Label>
            <Controller
              control={control}
              name="country_uuid"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Select
                  onValueChange={onChange}
                  value={value ? value : undefined}
                >
                  <SelectTrigger color={errors?.country_uuid && "destructive"}>
                    <SelectValue
                      placeholder={trans("Select country")}
                      className="whitespace-nowrap"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {options?.map((country: any) => {
                      return (
                        <SelectItem
                          value={country?.uuid}
                          key={country?.country_uuid}
                        >
                          {country?.country_name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.country_uuid && (
              <div className=" text-destructive">
                {trans(errors.country_uuid.message)}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>
              {trans("State Name")}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              disabled={isPending}
              type="text"
              size="lg"
              className={cn("", {
                "border-destructive": errors.state_name,
              })}
              placeholder={trans("Enter state name")}
              {...register("state_name")}
            />
            {errors.state_name && (
              <div className=" text-destructive">
                {trans(errors.state_name.message)}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>
              {trans("Short Code")}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              disabled={isPending}
              type="text"
              size="lg"
              placeholder={trans("Enter short code")}
              {...register("short_code")}
            />
            {errors.short_code && (
              <div className=" text-destructive">
                {trans(errors.short_code.message)}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default StateForm;
