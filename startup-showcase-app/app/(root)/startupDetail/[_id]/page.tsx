import { formatDate } from "@/lib/utils"
import { client } from "@/sanity/lib/client"
import { playlist_query_by_slug, startup_query_by_id } from "@/sanity/lib/queries"
import { queryStartupDetailType, startupInfoType } from "@/types"
import Image from "next/image"
import Link from "next/link"
import markdownit from 'markdown-it'
import { notFound } from "next/navigation"
import { Suspense } from 'react'
import Views from "@/components/shared/Views"
import ViewSkeleton from "@/components/shared/ViewSkeleton"
import StartupCard from "@/components/card/StartupCard"

export const experimental_ppr = true

const startupDetail = async ({params}: {params: queryStartupDetailType}) => {
    
    const startupId = (await params)._id
    const playlistSlug = "shiokado-tech"
    /* 
    fetching the startup is indepedent on fetching the startups playlist
    use parallel fetching to save the loading time
    */
    const [startupInfo, {startups: featuredPlaylist}] = await Promise.all([
        await client.fetch(startup_query_by_id, {startupId}),
        await client.fetch(playlist_query_by_slug, {playlistSlug})
    ])

    if(!startupInfo) return notFound()
    const {
        _id, 
        title,
        img,
        desc,
        author: {_id: authorId, username, avatar},
        createdAt,
        category,
        pitch } = startupInfo
        
    const md = markdownit()
    const pitchContent = md.render(pitch || "");
    return(
        <div>
            <section className="r-container !min-[250px]">
                <h1 className="tag">{formatDate(createdAt)}</h1>
                <h1 className="heading">{title}</h1>
                <p className="sub-heading">{desc || ""}</p>
            </section>
            <section className="section_container">
                <Image 
                 src={img}
                 width={800}
                 height={1000}
                 className="mx-auto"
                 alt="thumbnail"
                />
                <div className="flex-between my-6">
                    <Link href={`../profile/${authorId}`} className="flex items-center gap-3">
                        <Image 
                        src={avatar}
                        width={60}
                        height={60}
                        alt="avatar"
                        className="rounded-full"
                        />
                        <span className="text-16-medium">{username}</span>
                    </Link>
                    <span className="category-tag">{category}</span>
                </div>
                <h1 className="text-30-bold">Pitch Details</h1>
                {
                    pitchContent === "" 
                    ?
                    <></>
                    :
                    <article 
                    dangerouslySetInnerHTML={{__html: pitchContent}}
                   />
                }
                {
                    featuredPlaylist.length > 0 && 
                    <div className="mt-16">
                        <h1 className="text-30-bold">Featured Playlist</h1>
                        <div className="sm:card_grid max-sm:card_grid-sm">
                            {
                                featuredPlaylist.map((startup: startupInfoType) => 
                                    <StartupCard key={startup._id} startupInfo={startup}/>
                                )
                            }
                        </div>
                    </div>
                }
            </section>
            
                
            <Suspense fallback={<ViewSkeleton />}>
                <Views startupId={_id} />
            </Suspense>
        </div>
    )
}

export default startupDetail