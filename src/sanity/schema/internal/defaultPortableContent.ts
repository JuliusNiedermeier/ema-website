import { defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { portableBlockType } from "../partials/portable-block";
import { portableImageType } from "../partials/portable-image";
import { portableAccordionType } from "../partials/portable-accordion";
import { portableEducationalProgramTypeCTAType } from "../partials/portable-educational-program-type-cta";
import { portableEducationalProgramCTAType } from "../partials/portable-educational-program-cta";

export const defaultPortableContent: SchemaTypeDef = {
  type: "internal",
  definition: defineType({
    title: "Block Content",
    name: "defaultPortableContent",
    type: "array",
    of: [
      portableBlockType,
      portableImageType,
      portableAccordionType,
      portableEducationalProgramTypeCTAType,
      portableEducationalProgramCTAType,
    ],
  }),
};
