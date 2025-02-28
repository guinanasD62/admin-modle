import BusinessDetails from "@/components/users/financier/business-details";
import React from "react";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <BusinessDetails />;
};

export default Page;