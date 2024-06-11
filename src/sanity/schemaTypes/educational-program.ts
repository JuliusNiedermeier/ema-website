import { defineType } from "sanity";
import { SchemaTypeDef } from "../schema";
import { GraduationCapIcon } from "lucide-react";
import { certificateType } from "./parts/certificate";
import { faqFields } from "./parts/faq-fields";

export const educationalProgram: SchemaTypeDef = {
  definition: defineType({
    name: "educational-program",
    title: "Educational program",
    type: "document",
    icon: GraduationCapIcon,
    fields: [
      {
        name: "name",
        title: "Name",
        type: "string",
        // validation: (r) => r.required().min(5).max(30),
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "name",
          maxLength: 30,
        },
        // validation: (r) => r.required().min(5).max(30),
      },
      {
        name: "educationalProgramType",
        title: "Educational program type",
        type: "reference",
        to: { type: "educational-program-type" },
        // validation: (r) => r.required(),
      },
      {
        name: "promotionalHeadline",
        title: "Promotional headline",
        type: "string",
        // validation: (r) => r.required().min(10).max(40),
      },
      {
        name: "introduction",
        title: "Introduction",
        type: "text",
        // validation: (r) => r.required().min(50).max(300),
      },
      {
        name: "highlights",
        title: "Highlights",
        type: "array",
        of: [
          {
            name: "highlight",
            title: "Highlight",
            type: "object",
            fields: [
              {
                name: "heading",
                title: "Heading",
                type: "string",
                // validation: (r) => r.required().min(5).max(20),
              },
              {
                name: "content",
                title: "Content",
                type: "text",
                // validation: (r) => r.required().min(20).max(40),
              },
            ],
          },
        ],
        // validation: (r) => r.required().min(2),
      },
      certificateType,
      {
        name: "programDetails",
        title: "Program details",
        type: "object",
        fields: [
          {
            name: "durationHeading",
            title: "Duration heading",
            type: "string",
          },
          {
            name: "type",
            title: "Type",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          },
          {
            name: "lessonTimesHeading",
            title: "Lesson times heading",
            type: "string",
          },
          {
            name: "startTime",
            title: "Start time",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          },
          {
            name: "endTime",
            title: "End time",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          },
          {
            name: "startDateHeading",
            title: "Start date heading",
            type: "string",
          },
          {
            name: "startDate",
            title: "Start date",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          },
          {
            name: "holidaysHeading",
            title: "Holidays heading",
            type: "string",
          },
          {
            name: "holidays",
            title: "Holidays",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          },
          {
            name: "totalDuration",
            title: "Total duration",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          },
        ],
      },
      {
        name: "gallery",
        title: "Gallery",
        type: "array",
        of: [
          {
            name: "gallery-item",
            title: "Galler item",
            type: "object",
            fields: [
              { name: "image", title: "Image", type: "image" },
              { name: "heading", title: "Heading", type: "string" },
              { name: "content", title: "Content", type: "text" },
            ],
          },
        ],
      },
      {
        name: "prerequisites",
        title: "Prerequisites",
        type: "object",
        fields: [
          {
            name: "heading",
            title: "Heading",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          },
          {
            name: "description",
            title: "Description",
            type: "text",
            // validation: (r) => r.required().min(50).max(300),
          },
          {
            name: "groups",
            title: "Groups",
            type: "array",
            of: [
              {
                name: "group",
                title: "Group",
                type: "object",
                fields: [
                  {
                    name: "items",
                    title: "Items",
                    type: "array",
                    of: [
                      {
                        name: "item",
                        title: "Item",
                        type: "string",
                        // validation: (r) => r.required().min(5).max(20),
                      },
                    ],
                    // validation: (r) => r.length(1),
                  },
                ],
              },
            ],
            // validation: (r) => r.length(1),
          },
        ],
      },
      {
        name: "subjects",
        title: "Subjects",
        type: "object",
        fields: [
          {
            name: "heading",
            title: "Heading",
            type: "string",
          },
          {
            name: "description",
            title: "Description",
            type: "text",
          },
          {
            name: "examSubjectsHeading",
            title: "Exam subjects heading",
            type: "string",
          },
          {
            name: "items",
            title: "Subjects",
            type: "array",
            of: [
              {
                name: "subject",
                title: "Subject",
                type: "object",
                fields: [
                  {
                    name: "name",
                    title: "Name",
                    type: "string",
                    // validation: (r) => r.required().min(5).max(20),
                  },
                  {
                    name: "isExamSubject",
                    title: "Is exam subject",
                    type: "boolean",
                  },
                ],
              },
            ],
            // validation: (r) => r.length(1),
          },
        ],
      },
      {
        name: "testimonials",
        title: "Testimonials",
        type: "object",
        fields: [
          {
            name: "heading",
            title: "Heading",
            type: "string",
          },
          {
            name: "subheading",
            title: "Subheading",
            type: "text",
          },
        ],
      },
      {
        name: "FAQs",
        title: "FAQs",
        type: "object",
        fields: [
          {
            name: "heading",
            title: "Heading",
            type: "string",
          },
          {
            name: "subheading",
            title: "Subheading",
            type: "text",
          },
          faqFields,
        ],

        // validation: (r) => r.length(1),
      },
    ],
    preview: {
      select: {
        title: "name",
        subtitle: "promotionalHeadline",
      },
    },
  }),
};
