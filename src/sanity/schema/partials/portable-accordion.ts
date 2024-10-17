import { defineArrayMember, defineField } from "sanity";
import { getSizeString } from "~/sanity/lib/validations";

export const portableAccordionType = defineArrayMember({
  name: "portableAccordion",
  title: "Akkordeon",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Einträge",
      description: getSizeString([3, 10], "Fragen"),
      type: "faq-items",
      validation: (r) => r.required().min(3).max(10),
    }),
  ],
});
