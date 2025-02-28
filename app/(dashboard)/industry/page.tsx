import React from "react";
import IndustryList from "@/components/industry/list";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <IndustryList />;
};

export default Page;
