import React from "react";
import Product from "@/components/users/seller/product";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <Product />;
};

export default Page;
