import React from "react";
import TaxList from "@/components/tax/list";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <TaxList />;
};

export default Page;
