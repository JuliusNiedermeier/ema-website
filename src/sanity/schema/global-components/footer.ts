import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { PanelBottomIcon } from "lucide-react";
import { createStringValidation, getSizeString } from "~/sanity/lib/validations";

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
        description: getSizeString("heading", "Zeichen"),
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "cta",
        title: "Call-To-Action-Text",
        description: getSizeString("label", "Zeichen"),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "staticPageLinksHeading",
        title: "Überschrift über den Links zu statischen Seiten",
        description: getSizeString("heading", "Zeichen"),
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "educationalProgramLinksHeading",
        title: "Überschrift über den Links zu den Bildungswegen und Bildungsgängen",
        description: getSizeString("heading", "Zeichen"),
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "socialLinks",
        title: "Social-Media-Links",
        description: "Maximal 6 Links",
        type: "array",
        validation: (r) => r.max(6),
        of: [
          defineArrayMember({
            name: "link",
            title: "Social-Media-Link",
            type: "object",
            validation: (r) => r.required(),
            fields: [
              defineField({
                name: "logoIcon",
                title: "Logo",
                type: "default-image",
                validation: (r) => r.required(),
              }),

              defineField({
                name: "url",
                title: "URL",
                type: "string",
                validation: (r) => r.required(),
              }),
            ],
            preview: { select: { title: "logoIcon.alt", media: "logoIcon" } },
          }),
        ],
      }),

      defineField({
        name: "copyrightNotice",
        title: "Copyright-Text",
        description: getSizeString(
          [10, 80],
          "Zeichen. Hinweis auf das Copyright. Erscheint am unteren Rand des Footers.",
        ),
        type: "string",
        validation: createStringValidation([10, 80]),
      }),

      defineField({
        name: "cookieSettingsLabel",
        title: "Cookie-Einstellungen Text",
        description: getSizeString("label", "Zeichen"),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "fundingNotice",
        title: "Hinweis auf Förderungen",
        type: "string",
      }),

      defineField({
        name: "fundingPartners",
        title: "Förderungspartner",
        type: "array",
        of: [
          defineArrayMember({
            title: "Förderungspartner",
            type: "default-image",
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Footer" }),
    },
  }),
};
