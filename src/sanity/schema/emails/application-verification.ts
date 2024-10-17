import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { BadgeCheckIcon } from "lucide-react";
import { createStringValidation, getSizeString } from "~/sanity/lib/validations";

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
        description: getSizeString(
          "heading",
          "Zeichen. Füge {name} in den Text ein, um dort den Namen des Bewerbers anzuzeigen.",
        ),
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "body",
        title: "Textinhalt",
        description: getSizeString(
          "description",
          "Zeichen. Füge {name} in den Text ein, um dort den Namen des Bewerbers anzuzeigen.",
        ),
        type: "text",
        validation: createStringValidation("description"),
      }),

      defineField({
        name: "verifyButtonLabel",
        title: "Text auf dem Bestätigungsbutton",
        description: getSizeString("label", "Zeichen"),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "regards",
        title: "Grußfloskel",
        description: getSizeString([10, 100], "Zeichen"),
        type: "string",
        validation: createStringValidation([10, 100]),
      }),

      defineField({
        name: "senderName",
        title: "Name des Teams",
        description: getSizeString("name", "Zeichen"),
        type: "string",
        validation: createStringValidation("name"),
      }),
    ],
    preview: {
      prepare: () => ({ title: "Anmeldungsbestätigung" }),
    },
  }),
};
