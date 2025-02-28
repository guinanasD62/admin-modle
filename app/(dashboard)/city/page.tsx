import React from "react";
import CityList from "@/components/city/list";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <CityList/>
};

export default Page;