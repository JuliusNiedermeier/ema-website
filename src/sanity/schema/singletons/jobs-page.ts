import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { BriefcaseBusinessIcon, MapPinIcon } from "lucide-react";

export const jobsPage: SchemaTypeDef = {
  singleton: true,
  definition: defineType({
    name: "jobs-page",
    title: "Offene Stellen",
    type: "document",
    icon: BriefcaseBusinessIcon,
    groups: [],
    fields: [
      defineField({
        name: "heading",
        title: "Überschrift",
        description: "5-40 Zeichen",
        type: "string",
        validation: (r) => r.required().min(5).max(40),
      }),
      defineField({
        name: "description",
        title: "Beschreibung",
        description: "100-300 Zeichen. Worum geht es auf dieser Seite?",
        type: "text",
        validation: (r) => r.required().min(100).max(300),
      }),
      defineField({
        name: "teachingJobLabel",
        title: "Lehrerstelle label",
        description: "5-40 Zeichen",
        type: "string",
        validation: (r) => r.required().min(5).max(40),
      }),
      defineField({
        name: "CTALabel",
        title: "Call-To-Action Text",
        description: "5-40 Zeichen",
        type: "string",
        validation: (r) => r.required().min(5).max(40),
      }),
      defineField({
        name: "jobs",
        title: "Stellen",
        description: "Liste der offenen Stellen.",
        type: "array",
        of: [
          defineArrayMember({
            name: "job",
            title: "Stelle",
            description: "Ein Stelleneintrag",
            type: "object",
            fields: [
              defineField({
                name: "title",
                title: "Stellenbezeichnung",
                description: "5-40 Zeichen",
                type: "string",
                validation: (r) => r.required().min(5).max(40),
              }),
              defineField({
                name: "shortDescription",
                title: "Kurzbeschreibung",
                description: "10-80 Zeichen",
                type: "string",
                validation: (r) => r.required().min(5).max(80),
              }),
              defineField({
                name: "isTeacherJob",
                title: "Ist dies eine Lehrerstelle?",
                description: "Lehrerstellen werden axplizit als solche gekennzeichnet.",
                type: "boolean",
              }),
              defineField({
                name: "fullDescription",
                title: "Beschreibung",
                description: "50-300 Zeichen",
                type: "text",
                validation: (r) => r.required().min(50).max(300),
              }),
            ],
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Offene Stellen" }),
    },
  }),
};
