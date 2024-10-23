import { defineType } from "sanity";
import { SchemaTypeDef } from "..";

export const defaultSlug: SchemaTypeDef = {
  type: "internal",
  definition: defineType({
    name: "default-slug",
    title: "Slug / Bezeichnung in der Internetadresse",
    description:
      "Maximal 60 Zeichen. Unter dieser Bezeichnung wird der Inhalt in der Internetadresse angezeigt. Kann durch klicken auf 'Generate' automatisch erzeugt werden.",
    type: "slug",
    options: {
      source: "name",
      maxLength: 60,
    },
  }),
};
