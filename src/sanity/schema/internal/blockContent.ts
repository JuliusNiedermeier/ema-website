import { defineType, defineArrayMember, defineField } from "sanity";
import { SchemaTypeDef } from "..";

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export const blockContent: SchemaTypeDef = {
  type: "internal",
  definition: defineType({
    title: "Block Content",
    name: "blockContent",
    type: "array",
    of: [
      defineArrayMember({
        title: "Block",
        type: "block",
        // Styles let you define what blocks can be marked up as. The default
        // set corresponds with HTML tags, but you can set any title or value
        // you want, and decide how you want to deal with it where you want to
        // use your content.
        styles: [
          { title: "Normal", value: "normal" },
          { title: "Heading", value: "h1" },
          { title: "Subheading", value: "h2" },
          // { title: "Quote", value: "blockquote" },
        ],
        lists: [{ title: "Bullet", value: "bullet" }],
        // Marks let you mark up inline text in the Portable Text Editor
        marks: {
          // Decorators usually describe a single property – e.g. a typographic
          // preference or highlighting
          decorators: [
            { title: "Strong", value: "strong" },
            { title: "Emphasis", value: "em" },
          ],
          // Annotations can be any object structure – e.g. a link or a footnote.
          annotations: [
            {
              title: "URL",
              name: "link",
              type: "object",
              fields: [
                {
                  title: "URL",
                  name: "href",
                  type: "url",
                },
              ],
            },
          ],
        },
      }),
      // You can add additional types here. Note that you can't use
      // primitive types such as 'string' and 'number' in the same array
      // as a block type.
      defineArrayMember({
        type: "image",
        options: { hotspot: true },
        fields: [
          {
            name: "alt",
            type: "string",
            title: "Alternative Text",
          },
        ],
      }),
      defineArrayMember({
        name: "accordion",
        title: "Akkordeon",
        type: "object",
        fields: [
          defineField({
            name: "items",
            title: "Einträge",
            type: "faq-items",
          }),
        ],
      }),
      defineArrayMember({
        name: "educationalProgramTypeCTA",
        title: "Bildungsweg Call-To-Action",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          defineField({
            name: "description",
            title: "beschreibung",
            type: "text",
          }),
          defineField({
            name: "educationalProgramType",
            title: "Bildungsweg",
            type: "reference",
            to: { type: "educational-program-type" },
          }),
        ],
      }),
      defineArrayMember({
        name: "educationalProgramCTA",
        title: "Bildungsgang Call-To-Action",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          defineField({
            name: "description",
            title: "beschreibung",
            type: "text",
          }),
          defineField({
            name: "educationalProgram",
            title: "Bildungsgang",
            type: "reference",
            to: { type: "educational-program" },
          }),
        ],
      }),
    ],
  }),
};