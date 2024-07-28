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
        description: "Füge {name} in den Text ein, um dort den Namen des Bewerbers anzuzeigen.",
        type: "string",
      }),
      defineField({
        name: "body",
        title: "Textinhalt",
        description: "Füge {name} in den Text ein, um dort den Namen des Bewerbers anzuzeigen.",
        type: "text",
      }),
      defineField({
        name: "verifyButtonLabel",
        title: "Text auf dem Bestätigungsbutton",
        type: "string",
      }),
      defineField({
        name: "regards",
        title: "Grußfloskel",
        type: "string",
      }),
      defineField({
        name: "senderName",
        title: "Name des Teams",
        type: "string",
      }),
    ],
    preview: {
      prepare: () => ({ title: "Anmeldungsbestätigung" }),
    },
  }),
};
