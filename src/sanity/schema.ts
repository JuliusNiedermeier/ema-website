import { type SchemaTypeDefinition } from "sanity";

import { blockContent } from "./schema/parts/blockContent";
import { category } from "./schema/repeatables/category";
import { post } from "./schema/repeatables/post";
import { author } from "./schema/repeatables/author";
import { homePage } from "./schema/singletons/home-page";
import { educationalProgramType } from "./schema/repeatables/educational-program-type";
import { educationalProgram } from "./schema/repeatables/educational-program";
import { campusPage } from "./schema/singletons/campus-page";
import { testimonial } from "./schema/repeatables/testimonial";

export type SchemaTypeDef = { singleton?: boolean; definition: SchemaTypeDefinition };

const types = [
  post,
  author,
  category,
  blockContent,
  homePage,
  testimonial,
  educationalProgramType,
  educationalProgram,
  campusPage,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: types.map((type) => type.definition),
};

export const singletonTypeNames = new Set(types.filter((type) => type.singleton).map((type) => type.definition.name));
