import SearchForm from "@/components/forms/SearchForm";
import { querySearchParamsType } from "@/types";

export default async function Home({searchParams}: {searchParams: querySearchParamsType}) {
  const query = (await searchParams).query

  return (
    <>
     <section className="r-container">
      <div className="heading">
        You can share you startup or create you own one here!
      </div>
      <div className="sub-heading">
        Enjoy yourself here!
      </div>
      <SearchForm query={query} />
     </section>
    </>
  );
}
