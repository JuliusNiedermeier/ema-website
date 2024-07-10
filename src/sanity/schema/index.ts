import { type SchemaTypeDefinition } from "sanity";

import { campusPage } from "./static-pages/campus-page";
import { economySocialPage } from "./static-pages/economy-social";
import { checkupPage } from "./static-pages/checkup-page";
import { homePage } from "./static-pages/home-page";
import { artPage } from "./static-pages/art-page";
import { contactPage } from "./static-pages/contact-page";
import { postPage } from "./dynamic-pages/post-page";
import { jobsPage } from "./static-pages/jobs-page";

import { category } from "./dynamic-content/category";
import { post } from "./dynamic-content/post";
import { author } from "./dynamic-content/author";
import { educationalProgramType } from "./dynamic-content/educational-program-type";
import { educationalProgram } from "./dynamic-content/educational-program";
import { testimonial } from "./dynamic-content/testimonial";

import { blockContent } from "./internal/blockContent";
import { certificateType } from "./internal/certificate";
import { faqType } from "./internal/faq-fields";
import { defaultSlug } from "./internal/default-slug";
import { headerConfigType } from "./global-components/header";
import { footerConfigType } from "./global-components/footer";
import { websiteSettingsType } from "./global-config/website-settings";

export type SchemaTypeDef = {
  type: "static-page" | "dynamic-page" | "dynamic-content" | "global-component" | "global-config" | "internal";
  definition: SchemaTypeDefinition;
};

const typeDefs = [
  // Static pages
  homePage,
  economySocialPage,
  campusPage,
  artPage,
  contactPage,
  checkupPage,
  jobsPage,

  // Dynamic pages
  postPage,

  // Dynmaic content
  educationalProgramType,
  educationalProgram,
  post,
  author,
  category,
  testimonial,

  // Global components
  headerConfigType,
  footerConfigType,

  // Global config
  websiteSettingsType,

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

export const staticPageTypeNames = new Set(extractTypeNames(typeDefs.filter((def) => def.type === "static-page")));

export const dynamicPageTypeNames = new Set(extractTypeNames(typeDefs.filter((def) => def.type === "dynamic-page")));

export const dynamicContentTypeNames = new Set(
  extractTypeNames(typeDefs.filter((def) => def.type === "dynamic-content")),
);

export const globalComponentTypeNames = new Set(
  extractTypeNames(typeDefs.filter((def) => def.type === "global-component")),
);

export const globalConfigTypeNames = new Set(extractTypeNames(typeDefs.filter((def) => def.type === "global-config")));
