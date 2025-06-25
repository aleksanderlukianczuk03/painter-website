export default {
  name: "painting",
  type: "document",
  title: "Painting",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Painting Name",
    },
    {
      name: "slug",
      type: "slug",
      title: "Painting Slug",
      options: {
        source: "title",
      },
    },
    {
      name: "mainImage",
      type: "image",
      title: "Main Image",
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
      name: 'dimensions',
      type: 'string',
      title: 'Dimensions (e.g., 12" x 16")',
    },
  ],
};