"use server"

import { auth } from "@/auth"
import { clientWrite } from "@/sanity/lib/client-write"
import slugify from "slugify"
import { parseServerActionResponse } from "./utils"
import { client } from "@/sanity/lib/client"
import { author_info_query_by_id } from "@/sanity/lib/queries"
const createStartup = async (state: any, formInfo: FormData, pitch: string) => {
    const session = await auth()
    if(!session){
        return parseServerActionResponse(
            {
                error: "User has not signed in!",
                status: "ERROR"
            }
        )
    }
    try{
        // create the new startup if user exists(login)
        const {title, description, category, image} = Object.fromEntries(Array.from(formInfo).filter((key) => key[0] !== "pitch"))
        const slug = slugify(title as string, {lower: true, strict: true})
        const profileId = session?.user?.id
        const currentAuthor = await client
                                    .withConfig({useCdn: false})
                                    .fetch(author_info_query_by_id, {profileId})
        const newStartupInfo = {
            _type: "startup",
            slug: {
                _type: "slug",
                current: slug
            },
            title,
            img: image,
            desc: description,
            author: {
                _type: "reference",
                _ref: currentAuthor._id  // _ref is the _id of the author(not id)
            },
            createdAt: new Date,
            views: 0,
            category, 
            pitch
        }
        
        const newStartup = await clientWrite
                                .withConfig({useCdn: false})
                                .create(newStartupInfo)
        return parseServerActionResponse(
            {
                ...newStartup,
                error: "",
                status: "SUCCESS"
            }
        )
        
    } catch(error){
        console.log(error)
        return parseServerActionResponse(
            {
                error: JSON.stringify(error),
                status: "ERROR"
            }
        )
    }
   
   
}

export default createStartup