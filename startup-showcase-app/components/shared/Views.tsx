import { clientWrite } from "@/sanity/lib/client-write"
import { startup_views_query_by_id } from "@/sanity/lib/queries"
import { after } from 'next/server'
const Views = async ({startupId}: {startupId: string}) => {
    const post = await clientWrite
                 .withConfig({useCdn: false})
                 .fetch(startup_views_query_by_id, {startupId})
    const viewCount = post.views
    after(async () => {
        await clientWrite
              .patch(startupId)
              .set({views: viewCount + 1})
              .commit()
              
    })

    return(
        <section className="view-container">
            <span className="view-text">{viewCount > 1 ? `${viewCount} views` : `${viewCount} view`}</span>
            <span className="view-ping"></span>
            <span className="view-fixed-ping"></span>
        </section>
    )
}

export default Views