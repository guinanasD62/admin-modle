

import ShippingDetails from "@/components/manage-shipping/shipping-details";
import React from "react";


interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <ShippingDetails/>;
};

export default Page;