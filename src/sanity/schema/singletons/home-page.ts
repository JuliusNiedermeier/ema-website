import { defineArrayMember, defineField, defineType } from "sanity";
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
      defineField({
        name: "heading",
        title: "Main heading",
        type: "string",
        group: "hero",
        validation: (r) => r.required().min(20).max(60),
      }),
      defineField({
        name: "description",
        title: "Description",
        type: "text",
        group: "hero",
        validation: (r) => r.required().min(50).max(200),
      }),
      defineField({
        name: "video",
        title: "Video",
        type: "file",
        group: "hero",
        validation: (r) => r.required(),
      }),
      defineField({
        name: "partners",
        title: "Partners",
        type: "array",
        group: "hero",
        of: [
          defineArrayMember({
            name: "partner",
            title: "Partner",
            type: "object",
            fields: [
              defineField({ name: "logo", title: "Logo", type: "image", validation: (r) => r.required() }),
              defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
            ],
          }),
        ],
      }),
      defineField({
        name: "artEducation",
        title: "Art education",
        type: "object",
        fields: [
          defineField({
            name: "backgroundImage",
            title: "Background image",
            type: "image",
            validation: (r) => r.required(),
          }),
          defineField({ name: "leftImage", title: "Left image", type: "image", validation: (r) => r.required() }),
          defineField({ name: "rightImage", title: "Right image", type: "image", validation: (r) => r.required() }),
          defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
          defineField({ name: "body", title: "Body", type: "string", validation: (r) => r.required() }),
          defineField({ name: "actionLabel", title: "Action label", type: "string", validation: (r) => r.required() }),
        ],
      }),
      defineField({
        name: "faq",
        title: "Frequently asked questions",
        type: "object",
        fields: [
          defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
          defineField({
            name: "items",
            title: "Questions",
            type: "array",
            of: [
              defineArrayMember({
                name: "item",
                title: "Question",
                type: "object",
                fields: [
                  defineField({ name: "question", title: "Question", type: "string" }),
                  defineField({ name: "answer", title: "Answer", type: "text" }),
                ],
              }),
            ],
            validation: (r) => r.min(3).max(10),
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Home page" }),
    },
  }),
};
