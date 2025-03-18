export type querySearchParamsType = Promise<{query?: string}>
export type startupInfoType = {
    _id: string, 
    title: string,
    img: string,
    desc: string,
    author: authorType,
    _createdAt: string,
    views: string,
    category: string,
    pitch: string
}
export type authorType = {
    _id: string,
    name: string,
    avatar: string,
    bio: string
}

