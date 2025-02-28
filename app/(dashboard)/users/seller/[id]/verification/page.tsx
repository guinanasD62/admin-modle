import Verification from "@/components/users/seller/verification";
import React from "react";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <Verification />;
};

export default Page;
