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
import { certificateType } from "./parts/certificate";
import { faqType } from "./parts/faq-fields";
import { defaultSlug } from "./parts/default-slug";
import { postPage } from "./singletons/post-page";

export type SchemaTypeDef = { singleton?: boolean; definition: SchemaTypeDefinition };

const types = [
  // Singletons
  homePage,
  economySocialPage,
  campusPage,
  artPage,
  contactPage,
  checkupPage,
  postPage,

  // Repeatables
  educationalProgramType,
  educationalProgram,
  post,
  author,
  category,
  testimonial,

  // Custom reusable types
  blockContent,
  certificateType,
  faqType,
  defaultSlug,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: types.map((type) => type.definition),
};

export const singletonTypeNames = new Set(types.filter((type) => type.singleton).map((type) => type.definition.name));
