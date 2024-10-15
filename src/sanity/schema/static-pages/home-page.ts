import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { HomeIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";
import { createArrayValidation, createStringValidation } from "~/sanity/lib/validations";

export const homePage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "home-page",
    title: "Startseite",
    type: "document",
    icon: HomeIcon,
    fields: [
      navigationLabel,

      defineField({
        name: "seo",
        type: "seo-fields",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "heading",
        title: "Headline",
        description: "Füge \n ein um einen Zeilenumbruch hinzuzufügen.",
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "teaser",
        title: "Slogan",
        type: "text",
        validation: createStringValidation([20, 100]),
      }),

      defineField({
        name: "heroVideo",
        title: "Video",
        description: "Wird standardmäßig ohne Ton abgespielt. Ton kann durch Besucher aktiviert werden.",
        type: "file",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "heroCTALabel",
        title: "Primärer Call-To-Action-Text",
        description:
          "5-15 Zeichen. Text des prominenten Call-To-Action Buttons am Anfang der Seite. Leitet den Besucher auf die Online-Anmeldung.",
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "partners",
        title: "Partner",
        description:
          "Möglichst mehr als drei Partner. Für eine gute Darstellung sollte das Logo jedes Bild an allen Seiten ausfüllen. Außerdem sollte das Logo auf hellem Hintergrund gut erkennbar sein und der Hintergrund transparent oder weiß sein.",
        type: "array",
        validation: createArrayValidation([3, 20]),
        of: [
          defineArrayMember({
            name: "partner",
            title: "Partner",
            type: "default-image",
            validation: (r) => r.required(),
          }),
        ],
      }),

      defineField({
        name: "introduction",
        title: "Einleitung",
        description: "",
        type: "object",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            description: "",
            type: "string",
            validation: createStringValidation("heading"),
          }),

          defineField({
            name: "description",
            title: "Kurzer Text",
            description: "",
            type: "text",
            validation: createStringValidation("description"),
          }),
        ],
      }),

      defineField({
        name: "featuredPosts",
        title: "Vorschau der neuesten Blogbeiträge",
        description: "Bereich mit einer Vorschau der drei neuesten Blogbeiträge.",
        type: "object",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            description: "5-20 Zeichen. Überschrift des Bereichs.",
            type: "string",
            validation: createStringValidation("label"),
          }),

          defineField({
            name: "allPostsLabel",
            title: "Text des Links auf alle Blogbeiträge",
            description: "5-20 Zeichen.",
            type: "string",
            validation: createStringValidation("label"),
          }),
        ],
      }),

      defineField({
        name: "testimonials",
        title: "Testimonials",
        description: "Positive Aussagen der Schüler zur Emil Molt Akademie.",
        type: "object",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            description: "5-40 Zeichen. Sollte die Zufriedenheit der Schüler unterstreichen.",
            type: "string",
            validation: createStringValidation("heading"),
          }),

          defineField({
            name: "description",
            title: "Unterüberschrift",
            description:
              '50-200 Zeichen. Beispiel: "Schüler lieben die Emil Molt Akademie. Das wir davon überzeugt sind ist klar – überzeug \' dich besser selbst und lies was unsere Schüler über uns sagen."',
            type: "text",
            validation: createStringValidation("description"),
          }),
        ],
      }),

      defineField({
        name: "faq",
        title: "FAQ - Frequently Asked Questions",
        description: "Die häufigsten allgemeinen Fragen zur Emil Molt Akademie können hier beantwortet werden.",
        type: "object",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            description: "10-40 Zeichen",
            type: "string",
            validation: createStringValidation("heading"),
          }),

          defineField({
            name: "description",
            title: "Beschreibung",
            type: "string",
            validation: createStringValidation("description"),
          }),

          defineField({
            name: "items",
            title: "Fragen",
            type: "faq-items",
            validation: (r) => r.required().min(3).max(10),
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Startseite" }),
    },
  }),
};
