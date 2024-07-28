import { defineArrayMember, defineField } from "sanity";

export const portableEducationalProgramTypeCTAType = defineArrayMember({
  name: "portableEducationalProgramTypeCTA",
  title: "Bildungsweg Call-To-Action",
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
      name: "educationalProgramType",
      title: "Bildungsweg",
      type: "reference",
      to: { type: "educational-program-type" },
    }),
  ],
});
