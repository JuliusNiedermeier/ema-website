import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";

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
        of: [
          defineArrayMember(
            defineField({
              name: "fee",
              title: "Beitrag",
              type: "object",
              fields: [
                defineField({
                  name: "income",
                  title: "Einkommen",
                  type: "string",
                }),
                defineField({
                  name: "fee",
                  title: "Beitrag",
                  type: "number",
                }),
                defineField({
                  name: "isCoverageRate",
                  title: "Ist dies der Kostendeckungssatz?",
                  type: "boolean",
                }),
              ],
            }),
          ),
        ],
      }),
    ],
  }),
};
