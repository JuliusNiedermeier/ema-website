import { type SchemaTypeDefinition } from "sanity";

import { blockContent } from "./schemaTypes/blockContent";
import { category } from "./schemaTypes/category";
import { post } from "./schemaTypes/post";
import { author } from "./schemaTypes/author";
import { homePage } from "./schemaTypes/home-page";
import { educationPath } from "./schemaTypes/education-path";
import { education } from "./schemaTypes/education";

export type SchemaTypeDef = { singleton?: boolean; definition: SchemaTypeDefinition };

const types = [post, author, category, blockContent, homePage, educationPath, education];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: types.map((type) => type.definition),
};

export const singletonTypeNames = new Set(types.filter((type) => type.singleton).map((type) => type.definition.name));
