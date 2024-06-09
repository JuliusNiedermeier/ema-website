import { defineType } from "sanity";
import { SchemaTypeDef } from "../schema";
import { GraduationCapIcon } from "lucide-react";

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
      {
        name: "certificate",
        title: "Certificate",
        type: "object",
        fields: [
          {
            name: "name",
            title: "Name",
            type: "string",
            // validation: (r) => r.required().min(5).max(30),
          },
          {
            name: "description",
            title: "Description",
            type: "text",
            // validation: (r) => r.required().min(50).max(300),
          },
          {
            name: "qualifications",
            title: "Qualifications",
            type: "array",
            of: [
              {
                name: "qualification",
                title: "Qualification",
                type: "string",
                // validation: (r) => r.required().min(5).max(30),
              },
            ],
            // validation: (r) => r.length(1),
          },
          {
            name: "jobs",
            title: "Job opportunities",
            type: "array",
            of: [
              {
                name: "job",
                title: "Job opportunity",
                type: "object",
                fields: [
                  {
                    name: "name",
                    title: "Name",
                    type: "string",
                    // validation: (r) => r.required().min(5).max(20),
                  },
                  {
                    name: "image",
                    title: "Image",
                    type: "image",
                    // validation: (r) => r.required(),
                  },
                ],
              },
            ],
            // validation: (r) => r.length(1),
          },
        ],
      },
      {
        name: "programDetails",
        title: "Program details",
        type: "object",
        fields: [
          {
            name: "type",
            title: "Type",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          },
          {
            name: "startEndTime",
            title: "Start and end time",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
          },
          {
            name: "startDate",
            title: "Start date",
            type: "string",
            // validation: (r) => r.required().min(5).max(20),
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
      {
        name: "FAQs",
        title: "FAQs",
        type: "array",
        of: [
          {
            name: "FAQ",
            title: "FAQ",
            type: "object",
            fields: [
              {
                name: "question",
                title: "Question",
                type: "string",
                // validation: (r) => r.required().min(10).max(30),
              },
              {
                name: "answer",
                title: "Answer",
                type: "text",
                // validation: (r) => r.required().min(50).max(300),
              },
            ],
          },
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
