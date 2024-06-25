import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { GraduationCapIcon } from "lucide-react";
import { certificateType } from "../parts/certificate";
import { faqFields } from "../parts/faq-fields";

export const educationalProgram: SchemaTypeDef = {
  definition: defineType({
    name: "educational-program",
    title: "Bildungsgang",
    type: "document",
    icon: GraduationCapIcon,
    fields: [
      defineField({
        name: "name",
        title: "Name",
        type: "string",
        // validation: (r) => r.required().min(5).max(30),
      }),
      defineField({
        name: "slug",
        title: "URL Text",
        type: "slug",
        options: {
          source: "name",
          maxLength: 30,
        },
        // validation: (r) => r.required().min(5).max(30),
      }),
      defineField({
        name: "educationalProgramType",
        title: "Bildungsweg",
        type: "reference",
        to: { type: "educational-program-type" },
        // validation: (r) => r.required(),
      }),
      defineField({
        name: "promotionalHeadline",
        title: "Bildungsgang Slogan",
        type: "string",
        // validation: (r) => r.required().min(10).max(40),
      }),
      defineField({
        name: "introduction",
        title: "Einleitung",
        type: "text",
        // validation: (r) => r.required().min(50).max(300),
      }),
      defineField({
        name: "highlights",
        title: "Highlights",
        type: "array",
        of: [
          defineArrayMember({
            name: "highlight",
            title: "Highlight",
            type: "object",
            fields: [
              defineField({
                name: "heading",
                title: "Überschrift",
                type: "string",
                // validation: (r) => r.required().min(5).max(20),
              }),
              defineField({
                name: "content",
                title: "Beschreibung",
                type: "text",
                // validation: (r) => r.required().min(20).max(40),
              }),
            ],
          }),
        ],
        // validation: (r) => r.required().min(2),
      }),
      certificateType,
      defineField({
        name: "programDetails",
        title: "Daten",
        type: "object",
        fields: [
          defineField({
            name: "durationHeading",
            title: "Gesamtdauer Überschrift",
            type: "string",
          }),
          defineField({
            name: "totalDuration",
            title: "Gesamtdauer",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          }),
          defineField({
            name: "type",
            title: "Ausbildungsart",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          }),
          defineField({
            name: "lessonTimesHeading",
            title: "Unterrichtszeiten Überschrift",
            type: "string",
          }),
          defineField({
            name: "startTime",
            title: "Unterrichtsbeginn",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          }),
          defineField({
            name: "endTime",
            title: "Unterrichtsschluss",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          }),
          defineField({
            name: "startDateHeading",
            title: "Ausbildungsbeginn Überschrift",
            type: "string",
          }),
          defineField({
            name: "startDate",
            title: "Ausbildungsbeginn",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          }),
          defineField({
            name: "holidaysHeading",
            title: "Ferien Überschrift",
            type: "string",
          }),
          defineField({
            name: "holidays",
            title: "Ferien",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          }),
        ],
      }),
      defineField({
        name: "gallery",
        title: "Gallerie",
        type: "array",
        of: [
          defineArrayMember({
            name: "gallery-item",
            title: "Gallerie Eintrag",
            type: "object",
            fields: [
              defineField({ name: "image", title: "Bild", type: "image" }),
              defineField({ name: "heading", title: "Überschrift", type: "string" }),
              defineField({ name: "content", title: "Inhalt", type: "text" }),
            ],
          }),
        ],
      }),
      defineField({
        name: "prerequisites",
        title: "Voraussetzungen",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          }),
          defineField({
            name: "description",
            title: "Schriftliche Beschreibung der Grundvoraussetzungen",
            type: "text",
            // validation: (r) => r.required().min(50).max(300),
          }),
          defineField({
            name: "groups",
            title: "Gruppen",
            type: "array",
            of: [
              defineArrayMember({
                name: "group",
                title: "Gruppe",
                type: "object",
                fields: [
                  defineField({
                    name: "items",
                    title: "Voraussetzungen",
                    type: "array",
                    of: [
                      defineArrayMember({
                        name: "item",
                        title: "Voraussetzung",
                        type: "string",
                        // validation: (r) => r.required().min(5).max(20),
                      }),
                    ],
                    // validation: (r) => r.length(1),
                  }),
                ],
              }),
            ],
            // validation: (r) => r.length(1),
          }),
        ],
      }),
      defineField({
        name: "subjects",
        title: "Fächer",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          defineField({
            name: "description",
            title: "Beschreibung",
            type: "text",
          }),
          defineField({
            name: "examSubjectsHeading",
            title: "Prüfungsfächer Überschrift",
            type: "string",
          }),
          defineField({
            name: "items",
            title: "Subjects",
            type: "array",
            of: [
              defineArrayMember({
                name: "subject",
                title: "Fach",
                type: "object",
                fields: [
                  defineField({
                    name: "name",
                    title: "Bezeichnung",
                    type: "string",
                    // validation: (r) => r.required().min(5).max(20),
                  }),
                  defineField({
                    name: "isExamSubject",
                    title: "Ist dies ein Prüfungsfach?",
                    type: "boolean",
                  }),
                ],
              }),
            ],
            // validation: (r) => r.length(1),
          }),
        ],
      }),
      defineField({
        name: "testimonials",
        title: "Testimonials",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          defineField({
            name: "subheading",
            title: "Beschreibung",
            type: "text",
          }),
        ],
      }),
      defineField({
        name: "FAQs",
        title: "Häufig gestellte Fragen",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          defineField({
            name: "subheading",
            title: "Beschreibung",
            type: "text",
          }),
          faqFields,
        ],

        // validation: (r) => r.length(1),
      }),
    ],
    preview: {
      select: {
        title: "name",
        subtitle: "promotionalHeadline",
      },
    },
  }),
};
