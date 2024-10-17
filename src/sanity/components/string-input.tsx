import { KBD, Stack } from "@sanity/ui";
import { FC } from "react";
import { InputProps } from "sanity";

export const StringInput: FC<InputProps> = (props) => {
  if (!["string", "text"].includes(props.schemaType.name)) return props.renderDefault(props);

  return (
    <Stack space={2}>
      <KBD
        style={{
          width: "fit-content",
          paddingInline: "0.2rem",
          paddingBlock: "0.1rem",
          backgroundColor: "var(--card-badge-default-bg-color)",
        }}
      >
        {(props.value as string | undefined | null)?.length || 0}
      </KBD>
      {props.renderDefault(props)}
    </Stack>
  );
};
