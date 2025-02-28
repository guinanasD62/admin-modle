import { CmsList } from "@/components/cms";
import React from "react";


interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <CmsList />;
};

export default Page;
