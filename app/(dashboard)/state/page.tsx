import React from "react";
import StateList from "@/components/state/list";

interface IPageProps {
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <StateList/>;
};

export default Page;
