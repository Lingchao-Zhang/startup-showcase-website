import { defineQuery } from 'next-sanity'

// get all startups
export const startups_query = defineQuery(
    `*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || author->username match $search || category match $search]{
     _id, 
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
 
// get the startup via the given id
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

// get the view number of the startup via the given id
export const startup_views_query_by_id = defineQuery(
    `*[_type == "startup" && defined(slug.current) && _id match $startupId][0]{
     views
    }
    `
)

// get the author info via the given id
export const author_info_query_by_id = defineQuery(
    `*[_type == "author" && id == $profileId][0]{
     _id
    }
    `
)

// get the author info via the given _id
export const author_info_query_by_underscoreID = defineQuery(
    `*[_type == "author" && _id == $authorId][0]{
     _id,
     id,
     username,
     avatar,
     bio
    }
    `
)

// get all startups of the given user
export const startups_query_by_author_id = defineQuery(
    `*[_type == "startup" && defined(slug.current) && author->_id == $authorId]{
     _id, 
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

// get the playlist by slug
export const playlist_query_by_slug = defineQuery(
    `*[_type == "playlist" && slug.current == $playlistSlug][0]{
     startups[]->{
        _id, 
        title,
        img,
        desc,
        author->{_id, username, avatar},
        createdAt,
        views,
        category
     }
    }
    `
)