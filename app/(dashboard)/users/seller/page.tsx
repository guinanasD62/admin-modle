import { SellerList } from "@/components/users";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <SellerList />;
};

export default Page;
