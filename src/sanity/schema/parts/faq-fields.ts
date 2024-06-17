import { SchemaTypeDefinition, defineArrayMember, defineField } from "sanity";

export const faqFields = {
  name: "items",
  title: "Fragen",
  type: "array",
  of: [
    defineArrayMember({
      name: "item",
      title: "Frage",
      type: "object",
      fields: [
        defineField({ name: "question", title: "Frage", type: "string" }),
        defineField({ name: "answer", title: "Antwort", type: "text" }),
      ],
    }),
  ],
} satisfies SchemaTypeDefinition;
