import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { SignpostIcon } from "lucide-react";
import { CheckupAnswerRatings } from "~/sanity/components/checkup-answer-ratings";

export const checkupPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "checkup-page",
    title: "Checkup",
    type: "document",
    icon: SignpostIcon,
    groups: [],
    fields: [
      defineField({
        name: "heading",
        title: "Überschrift",
        type: "string",
        validation: (r) => r.required().min(5).max(40),
      }),
      defineField({
        name: "previewText",
        title: "Auszug",
        type: "text",
        validation: (r) => r.required().min(50).max(100),
      }),
      defineField({
        name: "previewReadMoreLabel",
        title: "Mehr lesen Text",
        type: "string",
        validation: (r) => r.required().min(5).max(20),
      }),
      defineField({
        name: "form",
        title: "Formular",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          defineField({
            name: "questions",
            title: "Fragen",
            type: "array",
            of: [
              defineArrayMember({
                name: "question",
                title: "Frage",
                type: "object",
                fields: [
                  defineField({
                    name: "questionText",
                    title: "Fragetext",
                    type: "string",
                  }),
                  defineField({
                    name: "arrangeHorizontal",
                    title: "Antworten horizontal anordnen",
                    description: "Sollen die Antwortmöglichkeiten nebeneinander angezeigt werden?",
                    type: "boolean",
                    initialValue: false,
                  }),
                  defineField({
                    name: "isBoolean",
                    title: "Ausschließende Frage",
                    description: "Ist dies eine Frage, die ein Ergebnis sicher ausschlißen kann?",
                    type: "boolean",
                  }),
                  defineField({
                    name: "answers",
                    title: "Antworten",
                    type: "array",
                    of: [
                      defineArrayMember({
                        name: "answer",
                        title: "Antwort",
                        type: "object",
                        fields: [
                          defineField({
                            name: "answerText",
                            title: "Antworttext",
                            type: "string",
                          }),
                          defineField({
                            name: "answerRatings",
                            title: "Antwortwertungen",
                            description: "Wie passend wäre diese Antwort für die jeweiligen Bildungsgänge?",
                            type: "string",
                            components: {
                              input: CheckupAnswerRatings,
                            },
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Checkup" }),
    },
  }),
};
