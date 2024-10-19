import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { FlagIcon } from "lucide-react";
import { createStringValidation, getSizeString } from "~/sanity/lib/validations";
import { Text } from "@sanity/ui";

export const infoBannerConfigType: SchemaTypeDef = {
  type: "global-component",
  definition: defineType({
    name: "info-banner-component",
    title: "Infobanner",
    type: "document",
    icon: FlagIcon,
    fields: [
      defineField({
        name: "info",
        type: "boolean",
        components: {
          field: () => (
            <Text>
              Die Sichtbarkeit des Infobanners wird durch das veröffentlichen und das aufheben der Veröffentlichung
              gesteuert. Um den Infobanner zu aktivieren klickst du unten Rechts auf auf "Publish". Um ihn zu
              deaktivieren, klickst du unten rechts auf "..." {"->"} "Unpublish". Nach jedem veröffentlichen wird der
              Banner wieder allen Nutzern angezeigt. Auch denen die ihn zuvor ausgeblendet haben.
            </Text>
          ),
        },
      }),
      defineField({
        name: "content",
        title: "Info-Text",
        description: getSizeString([20, 100], "Zeichen. Text, der im Infobanner angezeigt wird"),
        type: "string",
        validation: createStringValidation([20, 100]),
      }),

      defineField({
        name: "link",
        title: "Link",
        type: "string",
        validation: (r) => r.required(),
      }),
    ],
    preview: {
      prepare: () => ({ title: "Infobanner" }),
    },
  }),
};
