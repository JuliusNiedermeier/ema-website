import { defineArrayMember, defineField, defineType } from "sanity";
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
      defineField({
        name: "heading",
        title: "Heading",
        type: "string",
        group: "campus",
      }),
      defineField({
        name: "previewText",
        title: "Preview text",
        type: "text",
        group: "campus",
      }),
      defineField({
        name: "heroImage",
        title: "Hero image",
        type: "image",
        group: "campus",
      }),
      defineField({
        name: "images",
        title: "Images",
        type: "array",
        group: "campus",
        of: [
          defineArrayMember({
            name: "image-item",
            title: "Image",
            type: "image",
          }),
        ],
      }),
      defineField({
        name: "team",
        title: "Team",
        type: "array",
        group: "team",
        of: [
          defineArrayMember({
            name: "team-member",
            title: "Team member",
            type: "object",
            fields: [
              defineField({
                name: "name",
                title: "Name",
                type: "string",
              }),
              defineField({
                name: "image",
                title: "Image",
                type: "image",
              }),
            ],
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Campus page" }),
    },
  }),
};
