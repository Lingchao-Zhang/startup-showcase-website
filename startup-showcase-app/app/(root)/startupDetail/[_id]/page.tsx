import { formatDate } from "@/lib/utils"
import { client } from "@/sanity/lib/client"
import { author_info_query_by_id, playlist_query_by_slug, startup_query_by_id } from "@/sanity/lib/queries"
import { modeSearchParamsType, queryStartupDetailType, startupInfoType } from "@/types"
import Image from "next/image"
import Link from "next/link"
import markdownit from 'markdown-it'
import { notFound, redirect } from "next/navigation"
import { Suspense } from 'react'
import Views from "@/components/shared/Views"
import ViewSkeleton from "@/components/shared/ViewSkeleton"
import StartupCard from "@/components/card/StartupCard"
import { auth } from "@/auth"
import StartupEditor from "@/components/forms/StartupEditor"
import { Button } from "@/components/ui/button"
import { PencilIcon } from "lucide-react"

export const experimental_ppr = true

const startupDetail = async ({params, searchParams}: {params: queryStartupDetailType, searchParams: modeSearchParamsType}) => {
    
    const startupId = (await params)._id
    const playlistSlug = "shiokado-tech"
    const mode = (await searchParams).mode
    let isAuthor = false
    
    /* 
    fetching the startup is indepedent on fetching the startups playlist
    use parallel fetching to save the loading time
    */
    const [startupInfo, {startups: featuredPlaylist}] = await Promise.all([
        await client.withConfig({useCdn: false}).fetch(startup_query_by_id, {startupId}),
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
    const session = await auth()
    if(!session && mode === "edit"){
        redirect(`./${startupId}?mode=view`)
    }
    const userId = session ? session.user?.id : null
    if(userId){
        const { _id: user_id } = await client.fetch(author_info_query_by_id, {profileId: userId})
        // verify whether the editor is the author or not
        if(mode === "edit" && user_id !== authorId){
            redirect(`./${startupId}?mode=view`)
        }
        if(user_id === authorId){
            isAuthor = true
        }
    }
    
    const md = markdownit()
    const pitchContent = md.render(pitch || "");
    const prevStartup = {startupId, title, img, desc, category, pitch}
    return(
        mode === "view" || !session ? 
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
                    <span className="category-tag max-sm:text-center">{category}</span>
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
                    mode === "view" && isAuthor &&
                    <Link href={`./${startupId}?mode=edit`}>
                        <Button className="startup-form-edit_btn">Edit Startup<PencilIcon /></Button>
                    </Link>
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
        :
        <StartupEditor prevStartupInfo={prevStartup} />
    )
}

export default startupDetail