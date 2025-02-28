import Document from "@/components/users/seller/documents";
import React from "react";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <Document />;
};

export default Page;