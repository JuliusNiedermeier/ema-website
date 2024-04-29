import { defineType } from "sanity";
import { SchemaTypeDef } from "../schema";
import { GraduationCapIcon } from "lucide-react";

export const education: SchemaTypeDef = {
  definition: defineType({
    name: "education",
    title: "Education",
    type: "document",
    icon: GraduationCapIcon,
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
      },
      {
        name: "short_description",
        title: "Short description",
        type: "text",
      },
      {
        name: "education_path",
        title: "Education path",
        type: "reference",
        to: { type: "education_path" },
      },
      {
        name: "vriant",
        title: "Variant",
        type: "string",
      },
      {
        name: "colors",
        title: "Colors",
        type: "object",
        fields: [
          { name: "primary", title: "Primary", type: "string" },
          { name: "darker", title: "Darker", type: "string" },
        ],
      },
      { name: "order", title: "Order", type: "number" },
    ],
  }),
};
