import { defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { EducationalProgramOrder } from "~/sanity/components/educational-program-order-input";

export const educationalProgramOrder: SchemaTypeDef = {
  type: "internal",
  definition: defineType({
    name: "educational-program-order",
    type: "number",
    components: {
      input: EducationalProgramOrder,
    },
  }),
};
