import { defineArrayMember, defineField } from "sanity";

export const portableAccordionType = defineArrayMember({
  name: "portableAccordion",
  title: "Akkordeon",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Einträge",
      type: "faq-items",
      validation: (r) => r.required().min(3).max(10),
    }),
  ],
});
