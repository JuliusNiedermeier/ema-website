import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { SignpostIcon } from "lucide-react";
import { EducationalProgramNumberRatingInput } from "~/sanity/components/educational-program-number-rating-input";
import { EducationalProgramBooleanRatingInput } from "~/sanity/components/educational-program-boolean-rating-input";

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
                    name: "allowMultipleAnswers",
                    title: "Erlaube mehrere Antworten",
                    type: "boolean",
                    initialValue: false,
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
                            name: "isExclusionCriterion",
                            title: "Ist diese Antwort Ausschlusskriterium?",
                            type: "boolean",
                          }),
                          defineField({
                            name: "numberRatings",
                            title: "Antwortwertungen",
                            description: "Wie passend wäre diese Antwort für die jeweiligen Bildungsgänge?",
                            type: "string",
                            components: {
                              input: EducationalProgramNumberRatingInput,
                            },
                            hidden: ({ parent }) => Boolean(parent?.isExclusionCriterion) === true,
                          }),
                          defineField({
                            name: "booleanRatings",
                            title: "Antwortwertungen",
                            description: "Wie passend wäre diese Antwort für die jeweiligen Bildungsgänge?",
                            type: "string",
                            components: {
                              input: EducationalProgramBooleanRatingInput,
                            },
                            hidden: ({ parent }) => Boolean(parent?.isExclusionCriterion) === false,
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
