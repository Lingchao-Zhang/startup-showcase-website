import { client } from "@/sanity/lib/client"
import { startups_query_by_author_id } from "@/sanity/lib/queries"
import { startupInfoType } from "@/types"
import StartupCard from "./StartupCard"

const UserStartups = async ({authorId}: {authorId: string}) => {
    const startups = await client
                           .withConfig({useCdn: false})
                           .fetch(startups_query_by_author_id, {authorId})

    return(
        <>
        {
            startups.length > 0 
            ? 
            startups.map((startup: startupInfoType) => <StartupCard key={startup._id} startupInfo={startup}/>)
            : 
            <p className="no-result">No startups</p>
        }
        </>
    )
}

export default UserStartups