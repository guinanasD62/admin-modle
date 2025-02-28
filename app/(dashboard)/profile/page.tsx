import AdminProfile from "@/components/profile/admin-profile";
interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <AdminProfile />;
};

export default Page;
