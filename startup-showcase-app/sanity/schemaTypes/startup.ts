import {defineField, defineType} from 'sanity'

export const startupType = defineType({
    name: "startup",
    title: "Startup",
    type: "document",
    fields: [
        defineField({
            name: "slug", // same as id
            type: "slug",
            options: {source: "title"},
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "title",
            type: "string",
            validation: (rule) => rule.min(1).required().error("please enter your startup title!")
        }),
        defineField({
            name: "img",
            type: "url",
            validation: (rule) => rule.required().error("please provide your startup image url!")
        }),
        defineField({
            name: "desc",
            type: "string"
        }),
        defineField({
            name: "author",
            type: "reference",
            to: [{type: "author"}],
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "createdAt",
            type: "datetime",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "views",
            type: "number",
            initialValue: 0
        }),
        defineField({
            name: "category",
            type: "string",
            validation: (rule) => rule.min(1).max(20).required()
        }),
        defineField({
            name: "pitch",
            type: "markdown",
            validation: (rule) => rule.min(1).required()
        }),

    ]
})