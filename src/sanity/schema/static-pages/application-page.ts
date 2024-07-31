import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { MailCheckIcon, PartyPopperIcon, TextSelectIcon, UserRoundPlusIcon, XCircleIcon } from "lucide-react";

export const applicationPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "application-page",
    title: "Online-Anmeldung",
    type: "document",
    icon: UserRoundPlusIcon,
    groups: [
      { name: "form", title: "Formular", icon: TextSelectIcon },
      { name: "verification", title: "Verifizierung", icon: MailCheckIcon },
      { name: "error", title: "Fehler", icon: XCircleIcon },
      { name: "success", title: "Erfolg", icon: PartyPopperIcon },
      { name: "already-done", title: "Bereits abgeschlossen", icon: PartyPopperIcon },
    ],
    fields: [
      defineField({
        name: "title",
        title: "Seitenname",
        type: "string",
        group: "form",
        validation: (r) => r.required(),
      }),
      defineField({
        name: "steps",
        title: "Formular-Schritte",
        type: "object",
        group: "form",
        fields: [
          defineField({
            name: "program",
            title: "Auswahl des Bildungsgangs",
            type: "object",
            fields: [
              defineField({
                name: "title",
                title: "Name dieses Schrittes",
                type: "string",
              }),
              defineField({
                name: "heading",
                title: "Überschrift",
                type: "string",
              }),
            ],
          }),
          defineField({
            name: "applicant",
            title: "Persönliche Angaben",
            type: "object",
            fields: [
              defineField({
                name: "title",
                title: "Name dieses Schrittes",
                type: "string",
              }),
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
                name: "nameInputLabel",
                title: "Label über dem Namens-Eingabefeld",
                type: "string",
              }),
              defineField({
                name: "nameInputPlaceholder",
                title: "Platzhaltertext im Namens-Eingabefeld",
                type: "string",
              }),
              defineField({
                name: "ageInputLabel",
                title: "Label über dem Alters-Eingabefeld",
                type: "string",
              }),
              defineField({
                name: "ageInputPlaceholder",
                title: "Platzhaltertext im Alters-Eingabefeld",
                type: "string",
              }),
              defineField({
                name: "motivationInputLabel",
                title: "Label über dem Motivations-Eingabefeld",
                type: "string",
              }),
              defineField({
                name: "motivationInputPlaceholder",
                title: "Platzhaltertext im Motivations-Eingabefeld",
                type: "string",
              }),
            ],
          }),
          defineField({
            name: "verification",
            title: "Eingabe der Email zur Verifizierung und Rückmeldung",
            type: "object",
            fields: [
              defineField({
                name: "title",
                title: "Name dieses Schrittes",
                type: "string",
              }),
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
                name: "emailInputLabel",
                title: "Label über dem Email-Eingabefeld",
                type: "string",
              }),
              defineField({
                name: "emailInputPlaceholder",
                title: "Platzhaltertext im Email-Eingabefeld",
                type: "string",
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
        fields: [
          defineField({
            name: "backLabel",
            title: "Text auf dem Zurück-Button",
            type: "string",
          }),
          defineField({
            name: "nextLabel",
            title: "Text auf dem Weiter-Button",
            type: "string",
          }),
          defineField({
            name: "submitLabel",
            title: "Text auf dem Weiter-Button im letzten schritt",
            type: "string",
          }),
        ],
      }),
      defineField({
        name: "verification",
        title: "Verifizierung",
        type: "object",
        group: "verification",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          defineField({
            name: "description",
            title: "Beschreibung",
            description: "Füge {name} oder {email} ein, um den Text zu personalisieren.",
            type: "text",
          }),
        ],
      }),
      defineField({
        name: "error",
        title: "Fehler",
        type: "object",
        group: "error",
        fields: [
          defineField({
            name: "link",
            title: "Ungültiger Link",
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
            ],
          }),
          defineField({
            name: "internal",
            title: "Serverfehler",
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
            ],
          }),
        ],
      }),
      defineField({
        name: "success",
        title: "Erfolg",
        type: "object",
        group: "success",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          defineField({
            name: "description",
            title: "Beschreibung",
            description: "Füge {Name}, {Email}, {Datum} oder {Bildungsgang} ein, um den Text zu personalisieren.",
            type: "text",
          }),
        ],
      }),
      defineField({
        name: "alreadyDone",
        title: "Bereits abgeschlossen",
        type: "object",
        group: "success",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          defineField({
            name: "description",
            title: "Beschreibung",
            description: "Füge {Name}, {Email}, {Datum} oder {Bildungsgang} ein, um den Text zu personalisieren.",
            type: "text",
          }),
        ],
      }),
      defineField({
        name: "toHomePageLabel",
        title: "Text auf dem Button zur Startseite",
        type: "string",
      }),
      defineField({
        name: "applyAgainLabel",
        title: "Text auf dem Button zur erneuten Anmeldung",
        type: "string",
      }),
    ],
    preview: {
      prepare: () => ({ title: "Online-Anmeldung" }),
    },
  }),
};
