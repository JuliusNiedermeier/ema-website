import { defineType } from "sanity";
import { SchemaTypeDef } from "../../schema";
import { RouteIcon } from "lucide-react";

export const educationPath: SchemaTypeDef = {
  definition: defineType({
    name: "educationPath",
    title: "Education path",
    type: "document",
    icon: RouteIcon,
    fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "description", title: "Description", type: "string" },
      { name: "duration", title: "Duration", type: "string" },
      { name: "color", title: "Color", type: "string" },
      { name: "order", title: "Order", type: "number" },
    ],
    preview: {
      select: {
        title: "title",
        subtitle: "duration",
      },
    },
  }),
};
