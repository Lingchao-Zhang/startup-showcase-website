export type querySearchParamsType = Promise<{query?: string}>
export type startupInfoType = {
    _id: string, 
    title: string,
    img: string,
    desc: string,
    author: {
        _id: string,
        name: string,
        avatar: string
    },
    _createdAt: string,
    views: string,
    category: string
}


