import { defineType } from "sanity";
import { SchemaTypeDef } from "..";

export const defaultSlug: SchemaTypeDef = {
  type: "internal",
  definition: defineType({
    name: "default-slug",
    title: "Bezeichnung im URL-Format",
    description:
      "Maximal 30 Zeichen. Unter dieser Bezeichnung wird der Inhalt in der URL angezeigt. Kann durch klicken auf 'Generate' automatisch erzeugt werden.",
    type: "slug",
    options: {
      source: "name",
      maxLength: 30,
    },
  }),
};
