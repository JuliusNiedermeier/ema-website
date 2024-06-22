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
import { economySocialPage } from "./singletons/economy-social";
import { checkupPage } from "./singletons/checkup-page";
import { artPage } from "./singletons/art-page";
import { contactPage } from "./singletons/contact-page";

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
  economySocialPage,
  checkupPage,
  artPage,
  contactPage,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: types.map((type) => type.definition),
};

export const singletonTypeNames = new Set(types.filter((type) => type.singleton).map((type) => type.definition.name));
