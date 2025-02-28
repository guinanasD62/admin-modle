import CountryList from "@/components/country/list";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <CountryList />;
};

export default Page;
