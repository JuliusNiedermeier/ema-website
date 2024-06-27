import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";

export const faqType: SchemaTypeDef = {
  definition: defineType({
    name: "faq-items",
    title: "FAQ Einträge",
    description: "3-10 Einträge",
    type: "array",
    of: [
      defineArrayMember({
        name: "item",
        title: "FAQ Eintrag",
        type: "object",
        fields: [
          defineField({
            name: "question",
            title: "Frage",
            description: "10-100 Zeichen",
            type: "string",
            validation: (r) => r.required().min(10).max(100),
          }),
          defineField({
            name: "answer",
            title: "Antwort",
            description: "50-1000 Zeichen",
            type: "text",
            validation: (r) => r.required().min(50).max(1000),
          }),
        ],
      }),
    ],
    validation: (r) => r.min(3).max(10),
  }),
};
