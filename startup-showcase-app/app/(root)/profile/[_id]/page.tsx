import { auth } from "@/auth"
import UserStartups from "@/components/card/UserStartups"
import UserStartupsSkeleton from "@/components/shared/UserStartupsSkeleton"
import { client } from "@/sanity/lib/client"
import { author_info_query_by_underscoreID } from "@/sanity/lib/queries"
import { queryUserProfileType } from "@/types"
import Image from "next/image"
import { Suspense } from "react"

const experimental_ppr = true

const userProfile = async ({params}: {params: queryUserProfileType}) => {
    const authorId = (await params)._id
    const session = await auth()
    const author = await client.fetch(author_info_query_by_underscoreID, {authorId})
    const {id, username, avatar, bio} = author
    return(
        <section className="profile_container">
            <div className="profile_card">
                <div className="profile_title"><h1 className="text-26-semibold text-center line-clamp-1">{username}</h1></div>
                <Image 
                 src={avatar}
                 width={220}
                 height={220}
                 alt="user avatar"
                 className="profile_image"
                />
                {bio === "" ? <></> : <p className="text-[24px] text-white">{bio}</p>}
            </div>
            
            {
                /* use ppr here. above part is static(cache) below part is dynamic(query each time) */
            }
            <div>
               <h1 className="text-30-bold">{session?.user?.id === id ? "Your" : "All"} Startups</h1>
               <div className="card_grid">
                <Suspense fallback={<UserStartupsSkeleton />}>
                    <UserStartups authorId={authorId}/>
                </Suspense>
               </div>
            </div>
        </section>
    )
}

export default userProfile