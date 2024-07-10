import { type SchemaTypeDefinition } from "sanity";

import { campusPage } from "./pages/campus-page";
import { economySocialPage } from "./pages/economy-social";
import { checkupPage } from "./pages/checkup-page";
import { homePage } from "./pages/home-page";
import { artPage } from "./pages/art-page";
import { contactPage } from "./pages/contact-page";
import { postPage } from "./pages/post-page";
import { jobsPage } from "./pages/jobs-page";

import { category } from "./repeatables/category";
import { post } from "./repeatables/post";
import { author } from "./repeatables/author";
import { educationalProgramType } from "./repeatables/educational-program-type";
import { educationalProgram } from "./repeatables/educational-program";
import { testimonial } from "./repeatables/testimonial";

import { blockContent } from "./internal/blockContent";
import { certificateType } from "./internal/certificate";
import { faqType } from "./internal/faq-fields";
import { defaultSlug } from "./internal/default-slug";

export type SchemaTypeDef = {
  type: "page" | "config" | "repeatable" | "internal";
  definition: SchemaTypeDefinition;
};

const typeDefs = [
  // Pages
  homePage,
  economySocialPage,
  campusPage,
  artPage,
  contactPage,
  checkupPage,
  postPage,
  jobsPage,

  // Repeatables
  educationalProgramType,
  educationalProgram,
  post,
  author,
  category,
  testimonial,

  // Config

  // Internal
  blockContent,
  certificateType,
  faqType,
  defaultSlug,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: typeDefs.map((type) => type.definition),
};

const extractTypeNames = (typeDefs: SchemaTypeDef[]) => typeDefs.map((def) => def.definition.name);

export const pageTypeNames = new Set(extractTypeNames(typeDefs.filter((def) => def.type === "page")));
export const configTypeNames = new Set(extractTypeNames(typeDefs.filter((def) => def.type === "config")));
export const repeatableTypeNames = new Set(extractTypeNames(typeDefs.filter((def) => def.type === "repeatable")));
