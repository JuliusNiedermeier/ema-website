import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { UserIcon } from "lucide-react";
import { createStringValidation, getSizeString } from "~/sanity/lib/validations";

export const author: SchemaTypeDef = {
  type: "dynamic-content",
  definition: defineType({
    name: "author",
    title: "Blogbeitrags-Autor",
    type: "document",
    icon: UserIcon,
    fields: [
      defineField({
        name: "name",
        type: "string",
        title: "Name",
        description: getSizeString("name", "Zeichen. Erscheint in Blogbeiträgen neben dem Bild des Autors."),
        validation: createStringValidation("name"),
      }),

      defineField({
        name: "image",
        type: "default-image",
        title: "Bild",
        description: "Erscheint in Blogbeiträgen neben dem Namen des Autors.",
        validation: (r) => r.required(),
      }),
    ],
  }),
};
