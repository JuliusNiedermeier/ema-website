import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { CalendarIcon } from "lucide-react";
import { createStringValidation, getSizeString } from "~/sanity/lib/validations";

export const event: SchemaTypeDef = {
  type: "dynamic-content",
  definition: defineType({
    name: "event",
    title: "Veranstaltung",
    type: "document",
    icon: CalendarIcon,
    fields: [
      defineField({
        name: "name",
        type: "string",
        title: "Bezeichnung der Veranstaltung",
        description: getSizeString("heading", "Zeichen."),
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "teaser",
        title: "Teaser - Kurzbeschreibung",
        description: getSizeString("short-description", "Zeichen."),
        type: "string",
        validation: createStringValidation("short-description"),
      }),

      defineField({
        name: "date",
        title: "Datum",
        type: "datetime",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "duration",
        title: "Dauer",
        description: getSizeString("label", "Zeichen"),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "location",
        title: "Ort",
        description: getSizeString("name", "Zeichen."),
        type: "string",
        validation: createStringValidation("name"),
      }),

      defineField({
        name: "locationURL",
        title: "Maps-Link",
        type: "string",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "showOnInfoEventPage",
        title: "Ist diese Veranstalung ein Infoabend?",
        type: "boolean",
      }),
    ],
    preview: {
      select: {
        name: "name",
        date: "date",
      },
      prepare: ({ name, date }) => {
        const d = new Date(date);
        const isInPast = d < new Date();
        return {
          title: name,
          subtitle: `${isInPast ? "Vergangen - " : ""}${new Date(date).toLocaleString("de")}`,
        };
      },
    },
  }),
};
