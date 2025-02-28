
"use client"
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PROVIDER_OPTIONS: any = {
  UPI: ["GPAY", "PHONEPAY", "PAYTM"],
  CARD: ["CREDITCARD", "DEBITCARD"],
  NETBANKING: ["ONLINEBANKING", "EFT"],
  WALLETS: ["AMAZONWALLET"],
};

interface IFormProps {
  trans: any;
  isPending: boolean;
  control: any;
  watch: any;
  action: any;
  setValue: any;
  errors: any;
  clearErrors: any;
  selectedPaymentMethod: any;
  defaultValues?: any;
}

const PaymentModeForm: React.FC<IFormProps> = ({
  trans,
  isPending,
  control,
  watch,
  setValue,
  errors,
  selectedPaymentMethod,
  defaultValues,
  clearErrors,
}) => {
  useEffect(() => {
    if (defaultValues) {
      setValue("payment_methods", defaultValues.payment_methods);
      setValue("payment_providers", Array.isArray(defaultValues.payment_providers) ? defaultValues.payment_providers : []);
    } else {
      setValue("payment_providers", []);
    }
  }, [defaultValues, setValue]);

  const handleCheckboxChange = (provider: string) => {
    const currentProviders = watch("payment_providers") || [];
    const newProviders = currentProviders.includes(provider)
      ? currentProviders.filter((item: any) => item !== provider)
      : [...currentProviders, provider];
    setValue("payment_providers", newProviders);
    clearErrors("payment_providers");
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-5 mb-2">
        <div>
          <Label className="pb-2">{trans("Payment Type")} :<span className="text-destructive">*</span></Label>
          <Controller
            control={control}
            name="payment_methods"
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={(val) => onChange(val)} value={value || undefined} disabled={isPending} >
                <SelectTrigger>
                  <SelectValue placeholder={trans("Select Payment Type")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="CARD">CARD</SelectItem>
                  <SelectItem value="NETBANKING">NETBANKING</SelectItem>
                  <SelectItem value="WALLETS">WALLETS</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors?.payment_methods && (
            <div className="text-destructive">
              {trans(errors.payment_methods.message)}
            </div>
          )}
        </div>

        {selectedPaymentMethod && ['UPI', 'CARD', 'NETBANKING', 'WALLETS'].includes(selectedPaymentMethod) && (
          <div className="flex flex-col gap-2">
            <Label>{trans("Select Providers")} :<span className="text-destructive">*</span></Label>
            {PROVIDER_OPTIONS[selectedPaymentMethod]?.map((provider: any) => (
              <div key={provider} className="flex items-center">
                <Checkbox
                  id={`payment_provider_${provider}`}
                  checked={(watch("payment_providers") || []).includes(provider)}
                  onCheckedChange={() => handleCheckboxChange(provider)}
                />
                <Label className="ml-2" htmlFor={`payment_provider_${provider}`}>
                  {provider}
                </Label>
              </div>
            ))}
            {errors?.payment_providers && (
              <div className="text-destructive">
                {trans(errors.payment_providers.message)}
              </div>
            )}
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default PaymentModeForm;

