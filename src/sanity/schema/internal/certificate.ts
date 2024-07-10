import { defineArrayMember, defineField, defineType } from "sanity";
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
        name: "name",
        title: "Name des Abschlusses",
        type: "string",
        // validation: (r) => r.required().min(5).max(30),
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
      defineField({
        name: "jobs",
        title: "Arbeitsmöglichkeiten",
        type: "array",
        of: [
          defineArrayMember({
            name: "job",
            title: "Arbeitsmöglichkeit",
            type: "object",
            fields: [
              defineField({
                name: "name",
                title: "Arbeitsbezeichnung",
                type: "string",
                // validation: (r) => r.required().min(5).max(20),
              }),
              defineField({
                name: "image",
                title: "Symbolbild",
                type: "image",
                // validation: (r) => r.required(),
              }),
            ],
          }),
        ],
        // validation: (r) => r.length(1),
      }),
    ],
  }),
};
