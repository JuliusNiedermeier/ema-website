import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { createArrayValidation, createStringValidation, getSizeString } from "~/sanity/lib/validations";

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
        description: getSizeString("heading", "Zeichen"),
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "description",
        title: "Beschreibung",
        description: getSizeString("description", "Zeichen"),
        type: "text",
        validation: createStringValidation("description"),
      }),

      defineField({
        name: "qualifications",
        title: "Qualifizierungen",
        type: "array",
        validation: createArrayValidation([1, 20]),
        of: [
          defineField({
            name: "qualification",
            title: "Qualifizierung",
            description: getSizeString("label", "Zeichen"),
            type: "string",
            validation: createStringValidation("label"),
          }),
        ],
      }),
    ],
  }),
};
