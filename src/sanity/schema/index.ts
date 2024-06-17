import { type SchemaTypeDefinition } from "sanity";

import { blockContent } from "./parts/blockContent";
import { category } from "./repeatables/category";
import { post } from "./repeatables/post";
import { author } from "./repeatables/author";
import { homePage } from "./singletons/home-page";
import { educationalProgramType } from "./repeatables/educational-program-type";
import { educationalProgram } from "./repeatables/educational-program";
import { campusPage } from "./singletons/campus-page";
import { testimonial } from "./repeatables/testimonial";

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
