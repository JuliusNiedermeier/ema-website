import { type SchemaTypeDefinition } from "sanity";

import { campusPage } from "./static-pages/campus-page";
import { economySocialPage } from "./static-pages/economy-social";
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

import { defaultPortableContent } from "./internal/defaultPortableContent";
import { certificateType } from "./internal/certificate";
import { faqType } from "./internal/faq-fields";
import { defaultSlug } from "./internal/default-slug";
import { headerConfigType } from "./global-components/header";
import { footerConfigType } from "./global-components/footer";
import { websiteSettingsType } from "./global-config/website-settings";
import { genericCTAType } from "./internal/generic-cta";
import { applicationVerificationEmail } from "./emails/application-verification";
import { textPortableContent } from "./internal/textPortableContent";
import { privacyPage } from "./static-pages/privacy-page";
import { impressumPage } from "./static-pages/impressum-page";
import { cookieNoticeConfigType } from "./global-components/cookie-notice";
import { bentoCTAConfigType } from "./global-components/bento-cta";
import { timeSelect } from "./internal/time-select";
import { applicationPage } from "./static-pages/application-page";
import { educationalProgramPage } from "./dynamic-pages/educational-program-page";
import { feesPage } from "./static-pages/fees-page";
import { blogPage } from "./static-pages/blog-page";
import { infoEventPage } from "./static-pages/info-event-page";
import { consultingPage } from "./static-pages/consulting-page";
import { subjectType } from "./dynamic-content/subject";
import { comparisonPage } from "./static-pages/comparison-page";
import { infoBannerConfigType } from "./global-components/info-banner";
import { defaultImage } from "./internal/default-image";
import { educationalProgramTypeOrder } from "./internal/educational-program-type-order";
import { educationalProgramOrder } from "./internal/educational-program-order";
import { educationalProgramTypePage } from "./dynamic-pages/educational-program-type-page";
import { seoFieldsType } from "./internal/seo-fields";
import { event } from "./dynamic-content/event";
import { redirectsType } from "./global-config/redirects";

export type SchemaTypeDef = {
  type:
    | "static-page"
    | "dynamic-page"
    | "dynamic-content"
    | "global-component"
    | "global-config"
    | "email"
    | "internal";
  definition: SchemaTypeDefinition;
};

const typeDefs = [
  // Static pages
  homePage,
  economySocialPage,
  campusPage,
  artPage,
  blogPage,
  applicationPage,
  comparisonPage,
  contactPage,
  infoEventPage,
  consultingPage,
  feesPage,
  jobsPage,
  privacyPage,
  impressumPage,

  // Dynamic pages
  postPage,
  educationalProgramPage,
  educationalProgramTypePage,

  // Dynmaic content
  educationalProgramType,
  educationalProgram,
  event,
  post,
  author,
  category,
  testimonial,
  subjectType,

  // Global components
  headerConfigType,
  footerConfigType,
  cookieNoticeConfigType,
  bentoCTAConfigType,
  infoBannerConfigType,

  // Global config
  websiteSettingsType,
  redirectsType,

  // Emails
  applicationVerificationEmail,

  // Internal
  defaultPortableContent,
  textPortableContent,
  certificateType,
  faqType,
  defaultSlug,
  genericCTAType,
  timeSelect,
  defaultImage,
  educationalProgramTypeOrder,
  educationalProgramOrder,
  seoFieldsType,
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

export const emailTypeNames = new Set(extractTypeNames(typeDefs.filter((def) => def.type === "email")));

export const globalConfigTypeNames = new Set(extractTypeNames(typeDefs.filter((def) => def.type === "global-config")));
