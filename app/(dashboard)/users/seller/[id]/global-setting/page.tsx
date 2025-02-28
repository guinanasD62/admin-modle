import React from "react";
import GlobalSetting from "@/components/users/seller/global-setting";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <GlobalSetting />;
};

export default Page;
