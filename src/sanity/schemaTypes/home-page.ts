import { defineType } from "sanity";
import { SchemaTypeDef } from "../schema";
import { HomeIcon } from "lucide-react";

export const homePage: SchemaTypeDef = {
  singleton: true,
  definition: defineType({
    name: "home-page",
    title: "Home page",
    type: "document",
    icon: HomeIcon,
    groups: [
      {
        name: "hero",
        title: "Hero",
      },
    ],
    fields: [
      {
        name: "heading",
        title: "Main heading",
        type: "string",
        group: "hero",
      },
      {
        name: "description",
        title: "Description",
        type: "text",
        group: "hero",
      },
      {
        name: "video",
        title: "Video",
        type: "file",
        group: "hero",
      },
    ],
    preview: {
      prepare: () => ({ title: "Home page" }),
    },
  }),
};
