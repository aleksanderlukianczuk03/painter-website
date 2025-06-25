export default {
    name: 'blog',
    type: 'document',
    title: 'Blog',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title of blog article',
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug of your blog article',
            options: {
                source: 'title',
            },
        },

        {
            name: 'titleimage',
            type: 'image',
            title: 'Title image',
        },
        {
      name: "galleryImages",
      type: "array",
      title: "Gallery Images",
      of: [
        { type: "image" },
      ],
    },
    {
      name: "description",
      type: "text",
      title: "Painting Description",
    },
    {
      name: "price",
      type: "number",
      title: "Price (USD)",
    },
        {
            name: 'smallDescription',
            type: 'text',
            title: 'Small Description',
        },
        
        {
            name: 'content',
            type: 'array',
            title: 'Content',
            of: [
{type: 'block'},
                
            ]
        },
    ],
  
};
