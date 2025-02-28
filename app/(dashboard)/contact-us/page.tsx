import ContactUsList from "@/components/contact-us/list";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <ContactUsList />;
};

export default Page;
