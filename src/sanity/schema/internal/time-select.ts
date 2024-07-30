import { defineType } from "sanity";
import { TimeSelectInput } from "~/sanity/components/time-input";
import { SchemaTypeDef } from "..";

export const timeSelect: SchemaTypeDef = {
  type: "internal",
  definition: defineType({
    name: "time-select",
    type: "string",
    components: {
      input: TimeSelectInput,
    },
  }),
};
