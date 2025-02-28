import React, { useState, useEffect, useRef } from "react";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import toast from "react-hot-toast";
import { fetchCountryForDropdown } from "@/service/country.service";
import { fetchStateDropdown } from "@/service/state.service";

interface IFormProps {
  trans: any;
  isPending: boolean;
  register?: any;
  control?: any;
  watch?: any;
  errors?: any;
  setValue?: any;
  clearErrors?: any;
  resetField?: any;
  action?: any;
}

interface ICountry {
  uuid: string;
  country_name: string;
}
interface IState {
  uuid: string;
  state_name: string;
}

const CityForm: React.FC<IFormProps> = ({
  trans,
  isPending,
  register,
  control,
  watch,
  setValue,
  errors,
  action,
}) => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  const country_uuid: any = watch("country_uuid");
  const [refresh, setRefresh] = useState<boolean>(false);
  const hasFetchedCountries = useRef(false);

  useEffect(() => {
    if (!hasFetchedCountries.current) {
      FetchCountryForDropdown();
      hasFetchedCountries.current = true;
    }
  }, []);

  //Function to fetch country for dropdown.......................
  const FetchCountryForDropdown = async () => {
    try {
      const response = await fetchCountryForDropdown();
      if (response?.status !== true && response?.statusCode !== 200) {
        toast.error(response?.message);
      }
      setCountries(response?.data);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (country_uuid) {
      if (action === "add") {
        setValue("state_uuid", "");
      }
      if(action === 'edit' && states?.length>0){
        setValue("state_uuid", "");
      }
      setStates([]);
      FetchStateForDropdown(country_uuid);
    }
  }, [country_uuid]);

  //Function to fetch states for dropdown.........................
  const FetchStateForDropdown = async (country_uuid: string) => {
    try {
      setRefresh(prev => !prev);
      const response = await fetchStateDropdown({ uuid: country_uuid });
      if (response?.status !== true && response?.statusCode !== 200) {
        toast.error(response?.message);
      }
      setStates(response?.data);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-5 mb-2">
        <div className="flex flex-col gap-2">
          <Label>
            {trans("Country")} <span className=" text-destructive">*</span>
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
                  {countries.length > 0 &&
                    countries.map((country: ICountry) => {
                      return (
                        <SelectItem key={country.uuid} value={country.uuid}>
                          {country.country_name}
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
            {trans("State")} <span className=" text-destructive">*</span>
          </Label>
          <Controller key={String(refresh)}
            control={control}
            name="state_uuid"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                onValueChange={onChange}
                value={value ? value : undefined}
              >
                <SelectTrigger color={errors?.state_uuid && "destructive"}>
                  <SelectValue
                    placeholder={trans("Select state")}
                    className="whitespace-nowrap"
                  />
                </SelectTrigger>
                <SelectContent>
                  {states.length > 0 ? (
                    states.map((state) => (
                      <SelectItem key={state.uuid} value={state.uuid}>
                        {state.state_name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="" disabled>{trans("No states available")}</SelectItem>
                  )}
                </SelectContent>
              </Select>
            )
            }
          />
          {errors.state_uuid && (
            <div className=" text-destructive">
              {trans(errors.state_uuid.message)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            {trans("City Name")} <span className=" text-destructive">*</span>
          </Label>
          <Input
            type="text"
            size="lg"
            placeholder={trans("Enter city name")}
            className={cn("", {
              "border-destructive": errors?.city_name,
            })}
            disabled={isPending}
            {...register("city_name")}
          />
          {errors.city_name && (
            <div className=" text-destructive">
              {trans(errors.city_name.message)}
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default CityForm;
