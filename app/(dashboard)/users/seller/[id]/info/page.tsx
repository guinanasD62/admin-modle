import Info from "@/components/users/seller/info";
import React from "react";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <Info />;
};

export default Page;