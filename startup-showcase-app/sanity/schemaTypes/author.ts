import {defineField, defineType} from 'sanity'
export const authorType = defineType({
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
        defineField({
            name: "username",
            type: "string",
            validation: (rule) => rule.min(1).required().error("please enter your username")
        }),
        defineField({
            name: "id",
            type: "number"
        }),
        defineField({
            name: "avatar",
            type: "url"
        }),
        defineField({
            name: "bio",
            type: "string"
        })    
    ]
})
