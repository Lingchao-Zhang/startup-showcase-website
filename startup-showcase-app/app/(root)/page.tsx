import StartupCard from "@/components/card/StartupCard";
import SearchForm from "@/components/forms/SearchForm";
import { querySearchParamsType, startupInfoType } from "@/types";

export default async function Home({searchParams}: {searchParams: querySearchParamsType}) {
  const query = (await searchParams).query
  const startupResults = [
   { _id: "001",
    title: "kira-kira",
    img: "https://static.wikia.nocookie.net/bandori/images/1/16/Popipa_2023.png/revision/latest/scale-to-width-down/1000?cb=20231220030059",
    desc: "kira-kira doki doki, we are Poppin's Party", 
    author: {_id: "kira01", name: "kasumi", avatar:"https://static.wikia.nocookie.net/bandori/images/1/12/Kasumi_%28icon%29.png/revision/latest/scale-to-width-down/50?cb=20230822110604", bio:"" }, 
    _createdAt: String(new Date),
    views:"1M+",
    category: "Star Computing",
    pitch: ""
  }
  ]
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
        <h1 className="no-result">No Results!</h1>
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
    </>
  );
}
