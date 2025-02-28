import RevenueList from "@/components/revenue/list";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <RevenueList />;
};

export default Page;
