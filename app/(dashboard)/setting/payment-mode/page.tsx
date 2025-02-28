import PaymentModeList from "@/components/payment-mode/list";
import React from "react";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <PaymentModeList />;
};

export default Page;
