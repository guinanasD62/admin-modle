import { FinancierList } from "@/components/users";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <FinancierList />;
};

export default Page;
