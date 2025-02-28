import ManageShippingList from "@/components/manage-shipping/list";
import React from "react";



interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <ManageShippingList />;
};

export default Page;
 