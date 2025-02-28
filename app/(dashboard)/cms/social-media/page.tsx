import React from "react";
import { SocialMediaList } from "@/components/cms";


interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <SocialMediaList />;
};

export default Page;
