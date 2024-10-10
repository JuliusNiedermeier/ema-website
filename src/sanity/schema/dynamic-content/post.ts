import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { PenLineIcon } from "lucide-react";

export const post: SchemaTypeDef = {
  type: "dynamic-content",
  definition: defineType({
    name: "post",
    title: "Blogbeitrag",
    type: "document",
    icon: PenLineIcon,
    fields: [
      defineField({
        name: "name",
        title: "Titel",
        type: "string",
      }),
      defineField({
        name: "slug",
        title: "URL freundlicher Text",
        type: "default-slug",
      }),
      defineField({
        name: "author",
        title: "Autor",
        type: "reference",
        to: { type: "author" },
      }),
      defineField({
        name: "mainImage",
        title: "Thumbnail",
        type: "default-image",
      }),
      defineField({
        name: "category",
        title: "Kategorie",
        type: "reference",
        to: { type: "category" },
      }),
      defineField({
        name: "publishedAt",
        title: "Veröffentlichungsdatum",
        type: "datetime",
      }),
      defineField({
        name: "excerpt",
        title: "Auszug",
        type: "text",
      }),
      defineField({
        name: "body",
        title: "Inhalt",
        type: "defaultPortableContent",
      }),
    ],

    preview: {
      select: {
        media: "mainImage",
        title: "name",
        author: "author.name",
        publishedAt: "publishedAt",
      },
    },
  }),
};
