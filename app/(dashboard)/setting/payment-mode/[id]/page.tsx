import PaymentModeDetails from "@/components/payment-mode/payment-mode-details";
import React from "react";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <PaymentModeDetails/>;
};

export default Page;