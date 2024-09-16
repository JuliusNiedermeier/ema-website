import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { GraduationCapIcon } from "lucide-react";

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
      }),
      defineField({
        name: "isLearningField",
        title: "Ist dies ein Lernfeld?",
        type: "boolean",
      }),
    ],
  }),
};
