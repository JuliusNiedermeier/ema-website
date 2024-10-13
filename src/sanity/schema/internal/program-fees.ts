import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { createArrayValidation, createStringValidation } from "~/sanity/lib/validations";

export const programFeesType: SchemaTypeDef = {
  type: "internal",
  definition: defineType({
    name: "program-fees",
    title: "Schulbeitrag",
    type: "object",
    fields: [
      defineField({
        name: "fees",
        title: "Beiträge",
        type: "array",
        validation: createArrayValidation([1, 30]),
        of: [
          defineArrayMember({
            name: "fee",
            title: "Beitrag",
            type: "object",
            fields: [
              defineField({
                name: "income",
                title: "Einkommen",
                type: "string",
                validation: createStringValidation("label"),
              }),

              defineField({
                name: "fee",
                title: "Beitrag",
                type: "number",
                validation: (r) => r.required(),
              }),

              defineField({
                name: "isCoverageRate",
                title: "Ist dies der Kostendeckungssatz?",
                type: "boolean",
              }),
            ],
          }),
        ],
      }),
    ],
  }),
};
