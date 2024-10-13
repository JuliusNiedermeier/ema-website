import { defineField } from "sanity";
import { createStringValidation } from "~/sanity/lib/validations";

export const navigationLabel = defineField({
  name: "navigationLabel",
  title: "Bezeichnung dieser Seite in der Seitennavigation",
  type: "string",
  validation: createStringValidation("label"),
});
