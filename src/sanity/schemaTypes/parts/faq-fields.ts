import { SchemaTypeDefinition } from "sanity";

export const faqFields = {
  name: "items",
  title: "Questions",
  type: "array",
  of: [
    {
      name: "item",
      title: "Question",
      type: "object",
      fields: [
        { name: "question", title: "Question", type: "string" },
        { name: "answer", title: "Answer", type: "text" },
      ],
    },
  ],
} satisfies SchemaTypeDefinition;
