import { defineArrayMember, defineField } from "sanity";

export const portableEducationalProgramCTAType = defineArrayMember({
  name: "portableEducationalProgramCTA",
  title: "Bildungsgang Call-To-Action",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Überschrift",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "beschreibung",
      type: "text",
    }),
    defineField({
      name: "educationalProgram",
      title: "Bildungsgang",
      type: "reference",
      to: { type: "educational-program" },
    }),
  ],
});
