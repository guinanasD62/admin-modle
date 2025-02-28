import { ConsumerList } from "@/components/users";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <ConsumerList />;
};

export default Page;
