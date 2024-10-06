import { groq } from "next-sanity";
import { FC } from "react";
import { Label, Text } from "@sanity/ui";
import { NumberInputProps } from "sanity";
import { EducationalProgramOrderInputQueryResult } from "../../../generated/sanity/types";
import { DocumentOrderInput } from "./document-order-input";
import { createColorThemeStyles, ensureValidHSL } from "~/app/_utils/color-swatch";

const educationalProgramOrderInputQuery = groq`*[_type == "educational-program"] | order(order asc) {
    _id,
    name,
    order,
    educationalProgramType -> { name, color }
}`;

type EducationalProgramOrderProps = NumberInputProps;

export const EducationalProgramOrder: FC<EducationalProgramOrderProps> = () => {
  return (
    <DocumentOrderInput<EducationalProgramOrderInputQueryResult>
      query={educationalProgramOrderInputQuery}
      getDocumentID={(doc) => doc._id}
      getDocumentOrder={(doc) => doc.order || 0}
      renderItem={(doc) => (
        <div
          style={createColorThemeStyles(ensureValidHSL(doc.educationalProgramType?.color?.hsl))}
          className="flex flex-1 flex-col gap-1 rounded bg-themed-primary p-2 text-neutral-900"
        >
          <Label style={{ color: "black", opacity: "70%" }}>{doc.educationalProgramType?.name}</Label>
          <Text style={{ color: "black" }}>{doc.name}</Text>
        </div>
      )}
    />
  );
};
