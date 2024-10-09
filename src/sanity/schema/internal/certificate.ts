import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";

export const certificateType: SchemaTypeDef = {
  type: "internal",
  definition: defineType({
    name: "program-certificate",
    title: "Abschluss-Zertifikat",
    type: "object",
    fields: [
      defineField({
        name: "heading",
        title: "Überschrift",
        type: "string",
      }),
      defineField({
        name: "description",
        title: "Beschreibung",
        type: "text",
        // validation: (r) => r.required().min(50).max(300),
      }),
      defineField({
        name: "qualifications",
        title: "Qualifizierungen",
        type: "array",
        of: [
          {
            name: "qualification",
            title: "Qualifizierung",
            type: "string",
            // validation: (r) => r.required().min(5).max(30),
          },
        ],
        // validation: (r) => r.length(1),
      }),
    ],
  }),
};
