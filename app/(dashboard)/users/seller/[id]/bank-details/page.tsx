import Bankdetails from "@/components/users/seller/banking-details";
import React from "react";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <Bankdetails />;
};

export default Page;
