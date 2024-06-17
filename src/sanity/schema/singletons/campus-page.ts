import { defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { MapPinIcon } from "lucide-react";

export const campusPage: SchemaTypeDef = {
  singleton: true,
  definition: defineType({
    name: "campus-page",
    title: "Campus page",
    type: "document",
    icon: MapPinIcon,
    groups: [
      {
        name: "campus",
        title: "Campus",
      },
      {
        name: "team",
        title: "Team",
      },
    ],
    fields: [
      {
        name: "heading",
        title: "Heading",
        type: "string",
        group: "campus",
      },
      {
        name: "previewText",
        title: "Preview text",
        type: "text",
        group: "campus",
      },
      {
        name: "heroImage",
        title: "Hero image",
        type: "image",
        group: "campus",
      },
      {
        name: "images",
        title: "Images",
        type: "array",
        group: "campus",
        of: [
          {
            name: "image-item",
            title: "Image",
            type: "image",
          },
        ],
      },
      {
        name: "team",
        title: "Team",
        type: "array",
        group: "team",
        of: [
          {
            name: "team-member",
            title: "Team member",
            type: "object",
            fields: [
              {
                name: "name",
                title: "Name",
                type: "string",
              },
              {
                name: "image",
                title: "Image",
                type: "image",
              },
            ],
          },
        ],
      },
    ],
    preview: {
      prepare: () => ({ title: "Campus page" }),
    },
  }),
};
