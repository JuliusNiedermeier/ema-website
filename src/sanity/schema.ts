import { type SchemaTypeDefinition } from "sanity";

import { blockContent } from "./schema/parts/blockContent";
import { category } from "./schema/repeatables/category";
import { post } from "./schema/repeatables/post";
import { author } from "./schema/repeatables/author";
import { homePage } from "./schema/singletons/home-page";
import { educationPath } from "./schema/repeatables/education-path";
import { education } from "./schema/repeatables/education";
import { testimonial } from "./schema/repeatables/testimonial";
import { educationalProgramType } from "./schema/repeatables/educational-program-type";
import { educationalProgram } from "./schema/repeatables/educational-program";
import { campusPage } from "./schema/singletons/campus-page";

export type SchemaTypeDef = { singleton?: boolean; definition: SchemaTypeDefinition };

const types = [
  post,
  author,
  category,
  blockContent,
  homePage,
  educationPath,
  education,
  testimonial,
  educationalProgramType,
  educationalProgram,
  campusPage,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: types.map((type) => type.definition),
};

export const singletonTypeNames = new Set(types.filter((type) => type.singleton).map((type) => type.definition.name));
