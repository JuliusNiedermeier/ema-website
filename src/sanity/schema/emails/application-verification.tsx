import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { BadgeCheckIcon } from "lucide-react";

export const applicationVerificationEmail: SchemaTypeDef = {
  type: "email",
  definition: defineType({
    name: "application-verification-email",
    title: "Anmeldungsbestätigung",
    type: "document",
    icon: BadgeCheckIcon,
    fields: [
      defineField({
        name: "heading",
        title: "Überschrift",
        type: "string",
      }),
    ],
    preview: {
      prepare: () => ({ title: "Anmeldungsbestätigung" }),
    },
  }),
};
