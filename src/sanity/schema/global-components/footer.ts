import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { PanelBottomIcon } from "lucide-react";

export const footerConfigType: SchemaTypeDef = {
  type: "global-component",
  definition: defineType({
    name: "footer-config",
    title: "Footer",
    type: "document",
    icon: PanelBottomIcon,
    fields: [
      defineField({
        name: "ctaHeading",
        title: "CTA-Überschrift",
        type: "string",
      }),
      defineField({
        name: "cta",
        title: "Call-To-Action-Text",
        type: "string",
      }),
      defineField({
        name: "linkSections",
        title: "Link-Blöcke",
        type: "object",
        fields: [
          defineField({
            name: "academy",
            title: "Akademie",
            type: "object",
            fields: [
              defineField({
                name: "heading",
                title: "Überschrift",
                type: "string",
              }),
              defineField({
                name: "links",
                title: "Links",
                type: "object",
                fields: [
                  defineField({
                    name: "home",
                    title: "Home",
                    type: "string",
                  }),
                  defineField({
                    name: "economySocial",
                    title: "Wirtschaft & Soziales",
                    type: "string",
                  }),
                  defineField({
                    name: "art",
                    title: "Kunst",
                    type: "string",
                  }),
                  defineField({
                    name: "campus",
                    title: "Deine Akademie. Unser Team.",
                    type: "string",
                  }),
                  defineField({
                    name: "blog",
                    title: "Blog",
                    type: "string",
                  }),
                  defineField({
                    name: "contact",
                    title: "Kontakt",
                    type: "string",
                  }),
                  defineField({
                    name: "jobs",
                    title: "Offene Stellen",
                    type: "string",
                  }),
                ],
              }),
            ],
          }),
          defineField({
            name: "programs",
            title: "Bildungswege",
            type: "object",
            fields: [
              defineField({
                name: "heading",
                title: "Überschrift",
                type: "string",
              }),
            ],
          }),
        ],
      }),
      defineField({
        name: "socialLinks",
        title: "Social-Media-Links",
        type: "array",
        of: [
          defineArrayMember({
            name: "link",
            title: "Social-Media-Link",
            type: "object",
            fields: [
              defineField({
                name: "platformName",
                title: "Name der Plattform",
                type: "string",
              }),
              defineField({
                name: "logoIcon",
                title: "Logo",
                type: "image",
              }),
              defineField({
                name: "url",
                title: "URL",
                type: "url",
              }),
            ],
            preview: { select: { title: "platformName" } },
          }),
        ],
      }),
      defineField({
        name: "copyrightNotice",
        title: "Copyright-Text",
        description: "Hinweis auf das Copyright. Erscheint am unteren Rand des Footers.",
        type: "string",
      }),
      defineField({
        name: "legalLinks",
        title: "Rechliche Seiten-Links",
        type: "object",
        fields: [
          defineField({
            name: "privacy",
            title: "Datenschutzerklärung",
            type: "string",
          }),
          defineField({
            name: "impressum",
            title: "Impressum",
            type: "string",
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Footer" }),
    },
  }),
};
