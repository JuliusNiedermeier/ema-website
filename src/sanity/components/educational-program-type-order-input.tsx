import { groq } from "next-sanity";
import { FC } from "react";
import { Text } from "@sanity/ui";
import { NumberInputProps } from "sanity";
import { EducationalProgramTypeOrderInputQueryResult } from "../../../generated/sanity/types";
import { createColorThemeStyles, ensureValidHSL } from "~/app/_utils/color-swatch";
import { DocumentOrderInput } from "./document-order-input";

const educationalProgramTypeOrderInputQuery = groq`*[_type == "educational-program-type"] | order(order asc) {
    _id,
    name,
    color,
    order
}`;

type EducationalProgramTypeOrderProps = NumberInputProps;

export const EducationalProgramTypeOrder: FC<EducationalProgramTypeOrderProps> = () => {
  return (
    <DocumentOrderInput<EducationalProgramTypeOrderInputQueryResult>
      query={educationalProgramTypeOrderInputQuery}
      getDocumentID={(doc) => doc._id}
      getDocumentOrder={(doc) => doc.order || 0}
      renderItem={(doc) => (
        <div
          style={createColorThemeStyles(ensureValidHSL(doc.color?.hsl))}
          className="flex-1 rounded bg-themed-primary p-2 text-neutral-900"
        >
          <Text style={{ color: "black" }}>{doc.name}</Text>
        </div>
      )}
    />
  );
};
