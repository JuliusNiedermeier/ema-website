import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { UserRoundPlusIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";
import { createStringValidation } from "~/sanity/lib/validations";

export const applicationPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "application-page",
    title: "Online-Anmeldung",
    type: "document",
    icon: UserRoundPlusIcon,
    groups: [
      { name: "form", title: "Formular" },
      { name: "verification", title: "Verifizierung" },
      { name: "error", title: "Fehler" },
      { name: "success", title: "Erfolg" },
      { name: "already-done", title: "Bereits abgeschlossen" },
    ],
    fields: [
      navigationLabel,

      defineField({
        name: "heroImage",
        title: "Titelbild",
        type: "default-image",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "title",
        title: "Seitenname",
        type: "string",
        group: "form",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "steps",
        title: "Formular-Schritte",
        type: "object",
        group: "form",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "introduction",
            title: "Einleitung",
            type: "object",
            validation: (r) => r.required(),
            fields: [
              defineField({
                name: "heading",
                title: "Überschrift",
                type: "string",
                validation: createStringValidation("heading"),
              }),

              defineField({
                name: "description",
                title: "Beschreibung",
                type: "text",
                validation: createStringValidation("description"),
              }),
            ],
          }),

          defineField({
            name: "program",
            title: "Auswahl des Bildungsgangs",
            type: "object",
            validation: (r) => r.required(),
            fields: [
              defineField({
                name: "heading",
                title: "Überschrift",
                type: "string",
                validation: createStringValidation("heading"),
              }),
            ],
          }),

          defineField({
            name: "name",
            title: "Name",
            type: "object",
            validation: (r) => r.required(),
            fields: [
              defineField({
                name: "heading",
                title: "Überschrift",
                type: "string",
                validation: createStringValidation("heading"),
              }),

              defineField({
                name: "description",
                title: "Beschreibung",
                type: "text",
                validation: createStringValidation("short-description"),
              }),

              defineField({
                name: "placeholder",
                title: "Platzhaltertext",
                type: "string",
                validation: createStringValidation("label"),
              }),
            ],
          }),

          defineField({
            name: "age",
            title: "Alter",
            type: "object",
            validation: (r) => r.required(),
            fields: [
              defineField({
                name: "heading",
                title: "Überschrift",
                type: "string",
                validation: createStringValidation("heading"),
              }),

              defineField({
                name: "description",
                title: "Beschreibung",
                type: "text",
                validation: createStringValidation("short-description"),
              }),

              defineField({
                name: "placeholder",
                title: "Platzhaltertext",
                type: "string",
                validation: createStringValidation("label"),
              }),
            ],
          }),

          defineField({
            name: "email",
            title: "Email",
            type: "object",
            validation: (r) => r.required(),
            fields: [
              defineField({
                name: "heading",
                title: "Überschrift",
                type: "string",
                validation: createStringValidation("heading"),
              }),

              defineField({
                name: "description",
                title: "Beschreibung",
                type: "text",
                validation: createStringValidation("short-description"),
              }),

              defineField({
                name: "placeholder",
                title: "Platzhaltertext",
                type: "string",
                validation: createStringValidation("label"),
              }),
            ],
          }),
        ],
      }),

      defineField({
        name: "navigation",
        title: "Navigation",
        type: "object",
        group: "form",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "startLabel",
            title: "Text auf dem Start-Button",
            type: "string",
            validation: createStringValidation("label"),
          }),

          defineField({
            name: "backLabel",
            title: "Text auf dem Zurück-Button",
            type: "string",
            validation: createStringValidation("label"),
          }),

          defineField({
            name: "nextLabel",
            title: "Text auf dem Weiter-Button",
            type: "string",
            validation: createStringValidation("label"),
          }),

          defineField({
            name: "submitLabel",
            title: "Text auf dem Abschließen-Button im letzten schritt",
            type: "string",
            validation: createStringValidation("label"),
          }),
        ],
      }),

      defineField({
        name: "verification",
        title: "Verifizierung",
        type: "object",
        group: "verification",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            description: "Füge {Name}, {Email}, {Datum} oder {Bildungsgang} ein, um den Text zu personalisieren.",
            type: "string",
            validation: createStringValidation("heading"),
          }),

          defineField({
            name: "description",
            title: "Beschreibung",
            description: "Füge {Name}, {Email}, {Datum} oder {Bildungsgang} ein, um den Text zu personalisieren.",
            type: "text",
            validation: createStringValidation("description"),
          }),
        ],
      }),

      defineField({
        name: "error",
        title: "Fehler",
        type: "object",
        group: "error",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "link",
            title: "Ungültiger Link",
            type: "object",
            validation: (r) => r.required(),
            fields: [
              defineField({
                name: "heading",
                title: "Überschrift",
                type: "string",
                validation: createStringValidation("heading"),
              }),

              defineField({
                name: "description",
                title: "Beschreibung",
                type: "text",
                validation: createStringValidation("description"),
              }),
            ],
          }),

          defineField({
            name: "internal",
            title: "Serverfehler",
            type: "object",
            validation: (r) => r.required(),
            fields: [
              defineField({
                name: "heading",
                title: "Überschrift",
                type: "string",
                validation: createStringValidation("heading"),
              }),

              defineField({
                name: "description",
                title: "Beschreibung",
                type: "text",
                validation: createStringValidation("description"),
              }),
            ],
          }),
        ],
      }),

      defineField({
        name: "success",
        title: "Erfolg",
        type: "object",
        group: "success",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            description: "Füge {Name}, {Email}, {Datum} oder {Bildungsgang} ein, um den Text zu personalisieren.",
            type: "string",
            validation: createStringValidation("heading"),
          }),

          defineField({
            name: "description",
            title: "Beschreibung",
            description: "Füge {Name}, {Email}, {Datum} oder {Bildungsgang} ein, um den Text zu personalisieren.",
            type: "text",
            validation: createStringValidation("description"),
          }),
        ],
      }),

      defineField({
        name: "alreadyDone",
        title: "Bereits abgeschlossen",
        type: "object",
        group: "success",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            description: "Füge {Name}, {Email}, {Datum} oder {Bildungsgang} ein, um den Text zu personalisieren.",
            type: "string",
            validation: createStringValidation("heading"),
          }),

          defineField({
            name: "description",
            title: "Beschreibung",
            description: "Füge {Name}, {Email}, {Datum} oder {Bildungsgang} ein, um den Text zu personalisieren.",
            type: "text",
            validation: createStringValidation("description"),
          }),
        ],
      }),

      defineField({
        name: "toHomePageLabel",
        title: "Text auf dem Button zur Startseite",
        type: "string",
        group: "success",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "applyAgainLabel",
        title: "Text auf dem Button zur erneuten Anmeldung",
        type: "string",
        group: "success",
        validation: createStringValidation("label"),
      }),
    ],
    preview: {
      prepare: () => ({ title: "Online-Anmeldung" }),
    },
  }),
};
