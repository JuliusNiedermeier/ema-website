import { defineArrayMember, defineField, defineType, StringRule } from "sanity";
import { SchemaTypeDef } from "..";
import { ArrowRightCircleIcon } from "lucide-react";
import { createStringValidation, getSizeString } from "~/sanity/lib/validations";

const validator = (r: StringRule) =>
  r.required().custom((v) => (v?.startsWith("/") ? true : "Pfad muss mit / beginnen."));

export const redirectsType: SchemaTypeDef = {
  type: "global-config",
  definition: defineType({
    name: "redirect-settings",
    title: "Redirects - Weiterleitungen",
    type: "document",
    icon: ArrowRightCircleIcon,
    fields: [
      defineField({
        name: "redirects",
        title: "Weiterleitungen",
        type: "array",
        of: [
          defineArrayMember({
            title: "Weiterleitung",
            type: "object",
            fields: [
              defineField({
                name: "source",
                title: "Quelle",
                type: "string",
                validation: validator,
              }),
              defineField({
                name: "destination",
                title: "Ziel",
                type: "string",
                validation: validator,
              }),
              defineField({
                name: "permanent",
                title: "Permanente Umleitung?",
                description: "permanent → Statuscode 308 | temporär → Statuscode 307",
                type: "boolean",
              }),
            ],
            preview: {
              select: {
                source: "source",
                destination: "destination",
                permanent: "permanent",
              },
              prepare: ({ source, destination, permanent }) => ({
                title: `${source} → ${destination}`,
                subtitle: permanent ? "Permanent" : "Temporär",
              }),
            },
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Redirects - Weiterleitungen" }),
    },
  }),
};
