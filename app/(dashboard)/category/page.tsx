import React from "react";
import CategoryList from "@/components/category/list";

interface IPageProps {
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <CategoryList />;
};

export default Page;
