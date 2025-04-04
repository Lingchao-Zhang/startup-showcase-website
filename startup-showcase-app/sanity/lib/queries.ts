import { defineQuery } from 'next-sanity'
export const startups_query = defineQuery(
    `*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || author->username match $search || category match $search]{
     _id, 
     slug,
     title,
     img,
     desc,
     author->{_id, username, avatar},
     createdAt,
     views,
     category,
    } | order(createdAt desc)
    `
)

export const startup_query_by_id = defineQuery(
    `*[_type == "startup" && defined(slug.current) && _id match $startupId][0]{
     _id, 
     title,
     img,
     desc,
     author->{_id, username, avatar},
     createdAt,
     category,
     pitch
    }
    `
)

export const startup_views_query_by_id = defineQuery(
    `*[_type == "startup" && defined(slug.current) && _id match $startupId][0]{
     views
    }
    `
)