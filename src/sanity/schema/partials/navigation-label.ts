import { defineField } from "sanity";
import { createStringValidation, getSizeString } from "~/sanity/lib/validations";

export const navigationLabel = defineField({
  name: "navigationLabel",
  title: getSizeString("label", "Zeichen. Bezeichnung dieser Seite in der Seitennavigation"),
  type: "string",
  validation: createStringValidation("label"),
});
