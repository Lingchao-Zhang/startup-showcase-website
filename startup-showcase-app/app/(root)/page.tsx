import StartupCard from "@/components/card/StartupCard";
import SearchForm from "@/components/forms/SearchForm";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { startups_query } from "@/sanity/lib/queries";
import { querySearchParamsType, startupInfoType } from "@/types";

export default async function Home({searchParams}: {searchParams: querySearchParamsType}) {
  const query = (await searchParams).query
  const searchParam = query || null
  const{data: startupResults} = await sanityFetch({query: startups_query, params: {search: searchParam}})

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
     <section className="section_container">
      {
        query ?
        startupResults.length > 0 ?
        <h1 className="text-30-bold">Search Results for "{query}"</h1>
        :
        <h1 className="text-30-bold">No Results!</h1>
        :
        <h1 className="text-30-bold">All Startups</h1>
      }
      <div className="card_grid">
        {
          startupResults.length > 0 &&
          startupResults.map((startupDetail: startupInfoType) => <StartupCard key={startupDetail._id} startupInfo={startupDetail}/>)
        }
      </div>
     </section>
     <SanityLive/>
    </>
  );
}
