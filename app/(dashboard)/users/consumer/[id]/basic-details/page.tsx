import React from "react";
import BasicDetails from "@/components/users/consumer/basic-details";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <BasicDetails />;
};

export default Page;