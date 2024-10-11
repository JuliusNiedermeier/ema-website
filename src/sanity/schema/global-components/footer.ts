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
        name: "staticPageLinksHeading",
        title: "Überschrift über den Links zu statischen Seiten",
        type: "string",
      }),

      defineField({
        name: "educationalProgramLinksHeading",
        title: "Überschrift über den Links zu den Bildungswegen und Bildungsgängen",
        type: "string",
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
                type: "default-image",
              }),
              defineField({
                name: "url",
                title: "URL",
                type: "string",
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
        name: "cookieSettingsLabel",
        title: "Cookie-Einstellungen Text",
        type: "string",
      }),
    ],
    preview: {
      prepare: () => ({ title: "Footer" }),
    },
  }),
};
