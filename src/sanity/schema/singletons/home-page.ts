import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { HomeIcon } from "lucide-react";

export const homePage: SchemaTypeDef = {
  singleton: true,
  definition: defineType({
    name: "home-page",
    title: "Startseite",
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
        title: "Überschrift",
        type: "string",
        group: "hero",
        validation: (r) => r.required().min(20).max(60),
      }),
      defineField({
        name: "description",
        title: "Slogan",
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
        name: "videoFullscreenButtonLabel",
        title: "Video Vollbild Button Text",
        type: "string",
        validation: (r) => r.required().min(5).max(20),
      }),
      defineField({
        name: "videoCTAButtonLabel",
        title: "Video CTA Button Text",
        type: "string",
        group: "hero",
        validation: (r) => r.required().min(5).max(15),
      }),
      defineField({
        name: "partners",
        title: "Partner",
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
        name: "introduction",
        title: "Einleitung",
        type: "object",
        fields: [
          {
            name: "heading",
            title: "Überschrift",
            type: "string",
            validation: (r) => r.required().min(10).max(40),
          },
          {
            name: "paragraph",
            title: "Einleitung",
            type: "text",
            validation: (r) => r.required().min(100).max(300),
          },
        ],
      }),
      defineField({
        name: "featuredPosts",
        title: "Letzte Blog Posts",
        type: "object",
        fields: [
          {
            name: "heading",
            title: "Überschrift",
            type: "string",
            validation: (r) => r.required().min(5).max(20),
          },
          {
            name: "allPostsLabel",
            title: "Alle Beiträge Button Text",
            type: "string",
            validation: (r) => r.required().min(5).max(20),
          },
        ],
      }),
      defineField({
        name: "testimonials",
        title: "Testimonials",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          defineField({
            name: "subheading",
            title: "Unterüberschrift",
            type: "text",
          }),
        ],
      }),
      defineField({
        name: "faq",
        title: "Häufig gestellte Fragen Abschnitt",
        type: "object",
        fields: [
          defineField({ name: "heading", title: "Überschrift", type: "string", validation: (r) => r.required() }),
          defineField({
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
            validation: (r) => r.min(3).max(10),
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Startseite" }),
    },
  }),
};
