import { formatDate } from "@/lib/utils"
import { client } from "@/sanity/lib/client"
import { startup_query_by_id } from "@/sanity/lib/queries"
import { queryStartupDetailType } from "@/types"
import Image from "next/image"
import Link from "next/link"
import markdownit from 'markdown-it'
import { notFound } from "next/navigation"
import { Suspense } from 'react'
import Views from "@/components/shared/Views"
import ViewSkeleton from "@/components/shared/ViewSkeleton"

export const experimental_ppr = true

const startupDetail = async ({params}: {params: queryStartupDetailType}) => {
    
    const startupId = (await params)._id
    const startupInfo = await client.fetch(startup_query_by_id, {startupId})
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
            </section>
            <Suspense fallback={<ViewSkeleton />}>
                <Views startupId={_id} />
            </Suspense>
        </div>
    )
}

export default startupDetail