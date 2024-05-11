import { defineType } from "sanity";
import { SchemaTypeDef } from "../schema";
import { GraduationCapIcon } from "lucide-react";

export const education: SchemaTypeDef = {
  definition: defineType({
    name: "education",
    title: "Education",
    type: "document",
    icon: GraduationCapIcon,
    fields: [
      {
        name: "educationPath",
        title: "Education path",
        type: "reference",
        to: { type: "educationPath" },
      },
      {
        name: "title",
        title: "Title",
        type: "string",
      },
      {
        name: "variant",
        title: "Variant",
        type: "string",
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
      },
      {
        name: "order",
        title: "Order",
        type: "number",
      },
      {
        name: "colors",
        title: "Colors",
        type: "object",
        fields: [
          { name: "primary", title: "Primary", type: "string" },
          { name: "darker", title: "Darker", type: "string" },
        ],
      },
      {
        name: "excerpt",
        title: "Excerpt",
        type: "text",
      },
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
        name: "highlights",
        title: "Highlights",
        type: "array",
        of: [
          {
            name: "highlight",
            title: "Highlight",
            type: "object",
            fields: [
              { name: "heading", title: "Heading", type: "string" },
              { name: "content", title: "Content", type: "text" },
            ],
          },
        ],
      },
      {
        name: "certificate",
        title: "Certificate",
        type: "object",
        fields: [
          { name: "name", title: "Name", type: "string" },
          { name: "description", title: "Description", type: "text" },
          {
            name: "qualifications",
            title: "Qualifications",
            type: "array",
            of: [{ name: "qualification", title: "Qualification", type: "string" }],
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
                  { name: "name", title: "Name", type: "string" },
                  { name: "description", title: "Description", type: "string" },
                  { name: "image", title: "Image", type: "image" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "programDetails",
        title: "Program details",
        type: "object",
        fields: [
          { name: "type", title: "Type", type: "string" },
          { name: "startEndTime", title: "Start and end time", type: "string" },
          { name: "startDate", title: "Start date", type: "string" },
          { name: "holidays", title: "Holidays", type: "string" },
          { name: "totalDuration", title: "Total duration", type: "string" },
        ],
      },
      {
        name: "prerequisites",
        title: "Prerequisites",
        type: "object",
        fields: [
          { name: "description", title: "Description", type: "text" },
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
                    of: [{ name: "item", title: "Item", type: "string" }],
                  },
                ],
              },
            ],
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
              },
              {
                name: "isExamSubject",
                title: "Is exam subject",
                type: "boolean",
              },
            ],
          },
        ],
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
              { name: "question", title: "Question", type: "string" },
              { name: "answer", title: "Answer", type: "text" },
            ],
          },
        ],
      },
    ],
  }),
};
