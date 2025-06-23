import {defineField, defineType} from 'sanity'

export const playlistType = defineType({
    name: "playlist",
    title: "Playlist",
    type: "document",
    fields: [
        defineField({
            name: "slug",
            type: "slug",
            options: {source: "title"},
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "title",
            type: "string",
            validation: (rule) => rule.min(1).required().error("please enter your playlist title!")
        }),
        defineField({
            name: "startups",
            type: "array",
            of: [{type: "reference", to: [{type: "startup"}]}],
            validation: (rule) => rule.required()
        })
    ]

})