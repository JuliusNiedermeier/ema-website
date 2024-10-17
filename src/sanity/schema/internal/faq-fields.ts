import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { createStringValidation, getSizeString } from "~/sanity/lib/validations";

export const faqType: SchemaTypeDef = {
  type: "internal",
  definition: defineType({
    name: "faq-items",
    type: "array",
    of: [
      defineArrayMember({
        name: "item",
        title: "FAQ Eintrag",
        type: "object",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "question",
            title: "Frage",
            description: getSizeString([10, 100], "Zeichen"),
            type: "string",
            validation: createStringValidation([10, 100]),
          }),

          defineField({
            name: "answer",
            title: "Antwort",
            description: getSizeString("description", "Zeichen"),
            type: "text",
            validation: createStringValidation("description"),
          }),
        ],
        preview: {
          select: { title: "question", subtitle: "answer" },
        },
      }),
    ],
  }),
};
