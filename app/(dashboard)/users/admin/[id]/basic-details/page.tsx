import BasicDetails from "@/components/users/admin/basic-details";
import React from "react";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <BasicDetails />;
};

export default Page;