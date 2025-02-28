import React from "react";
import Order from "@/components/users/consumer/order";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <Order />;
};

export default Page;