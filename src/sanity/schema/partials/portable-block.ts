import { defineArrayMember } from "sanity";

export const portableBlockType = defineArrayMember({
  name: "portableBlock",
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
});
