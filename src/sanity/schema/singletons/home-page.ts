import { defineType } from "sanity";
import { SchemaTypeDef } from "..";
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
      {
        name: "partners",
        title: "Partners",
        type: "array",
        of: [
          {
            name: "partner",
            title: "Partner",
            type: "object",
            fields: [
              { name: "logo", title: "Logo", type: "image" },
              { name: "name", title: "Name", type: "string" },
            ],
          },
        ],
      },
      {
        name: "artEducation",
        title: "Art education",
        type: "object",
        fields: [
          { name: "backgroundImage", title: "Background image", type: "image" },
          { name: "leftImage", title: "Left image", type: "image" },
          { name: "rightImage", title: "Right image", type: "image" },
          { name: "title", title: "Title", type: "string" },
          { name: "body", title: "Body", type: "string" },
          { name: "actionLabel", title: "Action label", type: "string" },
        ],
      },
      {
        name: "faq",
        title: "Frequently asked questions",
        type: "object",
        fields: [
          { name: "heading", title: "Heading", type: "string" },
          {
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
          },
        ],
      },
    ],
    preview: {
      prepare: () => ({ title: "Home page" }),
    },
  }),
};
