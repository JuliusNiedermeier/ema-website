import { SchemaTypeDefinition } from "sanity";

export const certificateType = {
  name: "certificate",
  title: "Certificate",
  type: "object",
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
    },
    {
      name: "name",
      title: "Name",
      type: "string",
      // validation: (r) => r.required().min(5).max(30),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      // validation: (r) => r.required().min(50).max(300),
    },
    {
      name: "qualifications",
      title: "Qualifications",
      type: "array",
      of: [
        {
          name: "qualification",
          title: "Qualification",
          type: "string",
          // validation: (r) => r.required().min(5).max(30),
        },
      ],
      // validation: (r) => r.length(1),
    },
    {
      name: "jobs",
      title: "Job opportunities",
      type: "array",
      of: [
        {
          name: "job",
          title: "Job opportunity",
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
              // validation: (r) => r.required().min(5).max(20),
            },
            {
              name: "image",
              title: "Image",
              type: "image",
              // validation: (r) => r.required(),
            },
          ],
        },
      ],
      // validation: (r) => r.length(1),
    },
  ],
} satisfies SchemaTypeDefinition;
