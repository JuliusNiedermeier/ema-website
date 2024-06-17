import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { GraduationCapIcon } from "lucide-react";
import { certificateType } from "../parts/certificate";
import { faqFields } from "../parts/faq-fields";

export const educationalProgram: SchemaTypeDef = {
  definition: defineType({
    name: "educational-program",
    title: "Educational program",
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
        title: "Slug",
        type: "slug",
        options: {
          source: "name",
          maxLength: 30,
        },
        // validation: (r) => r.required().min(5).max(30),
      }),
      defineField({
        name: "educationalProgramType",
        title: "Educational program type",
        type: "reference",
        to: { type: "educational-program-type" },
        // validation: (r) => r.required(),
      }),
      defineField({
        name: "promotionalHeadline",
        title: "Promotional headline",
        type: "string",
        // validation: (r) => r.required().min(10).max(40),
      }),
      defineField({
        name: "introduction",
        title: "Introduction",
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
                title: "Heading",
                type: "string",
                // validation: (r) => r.required().min(5).max(20),
              }),
              defineField({
                name: "content",
                title: "Content",
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
        title: "Program details",
        type: "object",
        fields: [
          defineField({
            name: "durationHeading",
            title: "Duration heading",
            type: "string",
          }),
          defineField({
            name: "type",
            title: "Type",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          }),
          defineField({
            name: "lessonTimesHeading",
            title: "Lesson times heading",
            type: "string",
          }),
          defineField({
            name: "startTime",
            title: "Start time",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          }),
          defineField({
            name: "endTime",
            title: "End time",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          }),
          defineField({
            name: "startDateHeading",
            title: "Start date heading",
            type: "string",
          }),
          defineField({
            name: "startDate",
            title: "Start date",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          }),
          defineField({
            name: "holidaysHeading",
            title: "Holidays heading",
            type: "string",
          }),
          defineField({
            name: "holidays",
            title: "Holidays",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          }),
          defineField({
            name: "totalDuration",
            title: "Total duration",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          }),
        ],
      }),
      defineField({
        name: "gallery",
        title: "Gallery",
        type: "array",
        of: [
          defineArrayMember({
            name: "gallery-item",
            title: "Galler item",
            type: "object",
            fields: [
              defineField({ name: "image", title: "Image", type: "image" }),
              defineField({ name: "heading", title: "Heading", type: "string" }),
              defineField({ name: "content", title: "Content", type: "text" }),
            ],
          }),
        ],
      }),
      defineField({
        name: "prerequisites",
        title: "Prerequisites",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Heading",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
            // validation: (r) => r.required().min(50).max(300),
          }),
          defineField({
            name: "groups",
            title: "Groups",
            type: "array",
            of: [
              defineArrayMember({
                name: "group",
                title: "Group",
                type: "object",
                fields: [
                  defineField({
                    name: "items",
                    title: "Items",
                    type: "array",
                    of: [
                      defineArrayMember({
                        name: "item",
                        title: "Item",
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
        title: "Subjects",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Heading",
            type: "string",
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
          }),
          defineField({
            name: "examSubjectsHeading",
            title: "Exam subjects heading",
            type: "string",
          }),
          defineField({
            name: "items",
            title: "Subjects",
            type: "array",
            of: [
              defineArrayMember({
                name: "subject",
                title: "Subject",
                type: "object",
                fields: [
                  defineField({
                    name: "name",
                    title: "Name",
                    type: "string",
                    // validation: (r) => r.required().min(5).max(20),
                  }),
                  defineField({
                    name: "isExamSubject",
                    title: "Is exam subject",
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
            title: "Heading",
            type: "string",
          }),
          defineField({
            name: "subheading",
            title: "Subheading",
            type: "text",
          }),
        ],
      }),
      defineField({
        name: "FAQs",
        title: "FAQs",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Heading",
            type: "string",
          }),
          defineField({
            name: "subheading",
            title: "Subheading",
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
