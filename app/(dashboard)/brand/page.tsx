import React from "react";
import BrandList from "@/components/brand/list";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <BrandList />;
};

export default Page;
