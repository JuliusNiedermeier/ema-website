import { FC, useCallback } from "react";
import { Flex, Select, Text } from "@sanity/ui";
import { PatchEvent, set, StringInputProps } from "sanity";

type TimeSelectInputProps = StringInputProps;

export const TimeSelectInput: FC<TimeSelectInputProps> = ({ value, onChange }) => {
  const [hour, minute] = (value || "").split(":") || [null, null];

  const update = useCallback(
    (update: { hour?: string; minute?: string }) => {
      const newTime = [update.hour || hour || "", update.minute || minute || ""]
        .map((timePart) => timePart.padStart(2, "0"))
        .join(":");
      onChange(PatchEvent.from(set(newTime)));
    },
    [hour, minute, onChange],
  );

  return (
    <Flex align="center" gap={1}>
      <Select value={hour || ""} onChange={(e) => update({ hour: e.currentTarget.value })}>
        {Array.from(new Array(24), (_, i) => i.toString().padStart(2, "0")).map((hour) => (
          <option key={hour}>{hour}</option>
        ))}
      </Select>
      <Text>:</Text>
      <Select value={minute || ""} onChange={(e) => update({ minute: e.currentTarget.value })}>
        {Array.from(new Array(60 / 5), (_, i) => (i * 5).toString().padStart(2, "0")).map((minute) => (
          <option key={minute}>{minute}</option>
        ))}
      </Select>
    </Flex>
  );
};
