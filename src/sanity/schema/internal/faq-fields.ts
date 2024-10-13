import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { createArrayValidation, createStringValidation } from "~/sanity/lib/validations";

export const faqType: SchemaTypeDef = {
  type: "internal",
  definition: defineType({
    name: "faq-items",
    title: "FAQ Einträge",
    description: "3-10 Einträge",
    type: "array",
    validation: createArrayValidation([3, 10]),
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
            validation: createStringValidation([10, 100]),
          }),

          defineField({
            name: "answer",
            title: "Antwort",
            description: "50-1000 Zeichen",
            type: "text",
            validation: createStringValidation("description"),
          }),
        ],
      }),
    ],
  }),
};
