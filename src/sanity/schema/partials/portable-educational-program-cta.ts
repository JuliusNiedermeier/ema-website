import { defineArrayMember, defineField } from "sanity";
import { createStringValidation, getSizeString } from "~/sanity/lib/validations";

export const portableEducationalProgramCTAType = defineArrayMember({
  name: "portableEducationalProgramCTA",
  title: "Bildungsgang Call-To-Action",
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
      title: "beschreibung",
      description: getSizeString("description", "Zeichen"),
      type: "text",
      validation: createStringValidation("description"),
    }),

    defineField({
      name: "educationalProgram",
      title: "Bildungsgang",
      type: "reference",
      to: { type: "educational-program" },
      validation: (r) => r.required(),
    }),
  ],
});
