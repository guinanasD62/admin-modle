import React from "react";
import EmailTemplateList from "@/components/email-template/list";

interface IPageProps { }

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <EmailTemplateList />;
};

export default Page;
