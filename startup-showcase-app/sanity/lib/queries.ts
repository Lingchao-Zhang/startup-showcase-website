import { defineQuery } from 'next-sanity'
export const startups_query = defineQuery(
    `*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || author->username match $search || category match $search]{
     _id, 
     slug,
     title,
     img,
     desc,
     author->{_id, username, avatar, bio},
     createdAt,
     views,
     category,
     pitch
    } | order(createdAt desc)
    `
)