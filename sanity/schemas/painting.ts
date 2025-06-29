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
      name: "galleryMedia",
      type: "array",
      title: "Gallery Media (Images & Videos)",
      of: [
        { 
          type: "image",
          title: "Image"
        },
        { 
          type: "file",
          title: "Video",
          options: {
            accept: "video/*"
          }
        },
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
    {
      name: 'medium',
      type: 'string',
      title: 'Medium (Oil ‐ Linen)',
    },
    {
      name: 'sold',
      type: 'boolean',
      title: 'Sold',
      initialValue: false,
    },
    {
      name: 'soldAt',
      type: 'datetime',
      title: 'Sold Date',
      hidden: ({ document }: any) => !document?.sold,
    },
  ],
};