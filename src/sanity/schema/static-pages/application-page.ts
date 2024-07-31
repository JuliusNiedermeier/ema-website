import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { UserRoundPlusIcon } from "lucide-react";

export const applicationPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "application-page",
    title: "Online-Anmeldung",
    type: "document",
    icon: UserRoundPlusIcon,
    fields: [
      defineField({
        name: "title",
        title: "Seitenname",
        type: "string",
        validation: (r) => r.required(),
      }),
    ],
    preview: {
      prepare: () => ({ title: "Online-Anmeldung" }),
    },
  }),
};
