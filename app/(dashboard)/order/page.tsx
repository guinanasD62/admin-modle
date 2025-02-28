import OrderList from "@/components/order/list";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <OrderList />;
};

export default Page;
