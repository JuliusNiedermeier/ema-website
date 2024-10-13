import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { GraduationCapIcon } from "lucide-react";
import { createStringValidation } from "~/sanity/lib/validations";

export const subjectType: SchemaTypeDef = {
  type: "dynamic-content",
  definition: defineType({
    name: "subject",
    title: "Unterrichtsfach",
    type: "document",
    icon: GraduationCapIcon,
    fields: [
      defineField({
        name: "name",
        title: "Name",
        type: "string",
        validation: createStringValidation("label"),
      }),
    ],
  }),
};
