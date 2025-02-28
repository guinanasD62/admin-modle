import React from "react";
import AttributeValueList from "@/components/attribute-value/list";

interface IPageProps {
}

const Page: React.FunctionComponent<IPageProps> = async () => {
    return <AttributeValueList />;
};

export default Page;
