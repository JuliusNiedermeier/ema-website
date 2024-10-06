import { defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { EducationalProgramTypeOrder } from "~/sanity/components/educational-program-type-order-input";

export const educationalProgramTypeOrder: SchemaTypeDef = {
  type: "internal",
  definition: defineType({
    name: "educational-program-type-order",
    type: "number",
    components: {
      input: EducationalProgramTypeOrder,
    },
  }),
};
