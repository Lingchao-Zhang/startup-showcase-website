export type querySearchParamsType = Promise<{query?: string}>
export type queryStartupDetailType = Promise<{_id: string}>
export type queryUserProfileType = Promise<{_id: string}>
export type startupInfoType = {
    _id: string,
    slug: slugType, 
    title: string,
    img: string,
    desc: string,
    author: authorType,
    createdAt: Date,
    views: string,
    category: string,
    pitch: string
}
export type authorType = {
    _id: string,
    id: string,
    username: string,
    avatar: string,
    bio: string
}

export type slugType = {
    current: string,
}
