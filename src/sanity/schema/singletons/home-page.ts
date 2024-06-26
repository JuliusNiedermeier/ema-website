import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { HomeIcon } from "lucide-react";

export const homePage: SchemaTypeDef = {
  singleton: true,
  definition: defineType({
    name: "home-page",
    title: "Startseite",
    type: "document",
    icon: HomeIcon,
    fields: [
      defineField({
        name: "heading",
        title: "Headline",
        description: "20-60 Zeichen.",
        type: "string",
        validation: (r) => r.required().min(20).max(60),
      }),
      defineField({
        name: "description",
        title: "Slogan",
        description: "50-200 Zeichen.",
        type: "text",
        validation: (r) => r.required().min(50).max(200),
      }),
      defineField({
        name: "video",
        title: "Video",
        description: "Wird standardmäßig ohne Ton abgespielt. Ton kann durch Besucher aktiviert werden.",
        type: "file",
        validation: (r) => r.required(),
      }),
      defineField({
        name: "videoFullscreenButtonLabel",
        title: "Text des Video-Vollbild-Buttons",
        description: "5-20 Zeichen. Text des Buttons, der den Video-Vollbildmodus aktiviert.",
        type: "string",
        validation: (r) => r.required().min(5).max(20),
      }),
      defineField({
        name: "videoCTAButtonLabel",
        title: "Primärer Call-To-Action-Text",
        description:
          "5-15 Zeichen. Text des prominenten Call-To-Action Buttons am Anfang der Seite. Leitet den Besucher auf die Online-Anmeldung.",
        type: "string",
        validation: (r) => r.required().min(5).max(15),
      }),
      defineField({
        name: "partners",
        title: "Partner",
        description: "Möglichst mehr als drei Partner.",
        type: "array",
        of: [
          defineArrayMember({
            name: "partner",
            title: "Partner",
            type: "object",
            fields: [
              defineField({
                name: "logo",
                title: "Logo",
                description:
                  "Für eine gute Darstellung sollte das Logo das Bild an allen Seiten ausfüllen. Außerdem sollte das Logo auf hellem Hintergrund gut erkennbar sein und der Hintergrund transparent oder weiß sein.",
                type: "image",
                validation: (r) => r.required(),
              }),
              defineField({
                name: "name",
                title: "Name des Partners",
                description: "Wird nur angezeigt, falls das Logo nicht geladen werden kann.",
                type: "string",
                validation: (r) => r.required(),
              }),
            ],
          }),
        ],
      }),
      defineField({
        name: "introduction",
        title: "Einleitung",
        description: "",
        type: "object",
        fields: [
          {
            name: "heading",
            title: "Überschrift",
            description: "10-40 Zeichen.",
            type: "string",
            validation: (r) => r.required().min(10).max(40),
          },
          {
            name: "paragraph",
            title: "Kurzer Text",
            description: "100-300 Zeichen.",
            type: "text",
            validation: (r) => r.required().min(100).max(300),
          },
        ],
      }),
      defineField({
        name: "featuredPosts",
        title: "Vorschau der neuesten Blogbeiträge",
        description: "Bereich mit einer Vorschau der drei neuesten Blogbeiträge.",
        type: "object",
        fields: [
          {
            name: "heading",
            title: "Überschrift",
            description: "5-20 Zeichen. Überschrift des Bereichs.",
            type: "string",
            validation: (r) => r.required().min(5).max(20),
          },
          {
            name: "allPostsLabel",
            title: "Text des Links auf alle Blogbeiträge",
            description: "5-20 Zeichen.",
            type: "string",
            validation: (r) => r.required().min(5).max(20),
          },
        ],
      }),
      defineField({
        name: "testimonials",
        title: "Testimonials",
        description: "Positive Aussagen der Schüler zur Emil Molt Akademie.",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            description: "5-20 Zeichen. Sollte die Zufriedenheit der Schüler unterstreichen.",
            type: "string",
            validation: (r) => r.required().min(5).max(20),
          }),
          defineField({
            name: "subheading",
            title: "Unterüberschrift",
            description:
              '50-200 Zeichen. Beispiel: "Schüler lieben die Emil Molt Akademie. Das wir davon überzeugt sind ist klar – überzeug \' dich besser selbst und lies was unsere Schüler über uns sagen."',
            type: "text",
            validation: (r) => r.required().min(50).max(200),
          }),
        ],
      }),
      defineField({
        name: "faq",
        title: "Häufig gestellte Fragen",
        description:
          "3-10 Fragen. Die häufigsten allgemeinen Fragen zur Emil Molt Akademie können hier beantwortet werden.",
        type: "object",
        fields: [
          defineField({ name: "heading", title: "Überschrift", type: "string", validation: (r) => r.required() }),
          defineField({
            name: "items",
            title: "Fragen",
            type: "array",
            of: [
              defineArrayMember({
                name: "item",
                title: "Frage",
                type: "object",
                fields: [
                  defineField({
                    name: "question",
                    title: "Frage",
                    description: "10-100 Zeichen.",
                    type: "string",
                    validation: (r) => r.required().min(10).max(100),
                  }),
                  defineField({
                    name: "answer",
                    title: "Antwort",
                    description: "50-300 Zeichen.",
                    type: "text",
                    validation: (r) => r.required().min(50).max(300),
                  }),
                ],
              }),
            ],
            validation: (r) => r.min(3).max(10),
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Startseite" }),
    },
  }),
};
