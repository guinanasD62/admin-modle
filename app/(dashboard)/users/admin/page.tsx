import { AdminList } from "@/components/users";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <AdminList />;
};

export default Page;
