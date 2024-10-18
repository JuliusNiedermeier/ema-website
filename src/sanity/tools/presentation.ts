import { presentationTool } from "sanity/presentation";

export const presentation = presentationTool({
  previewUrl: {
    previewMode: {
      enable: "/api/draft-mode/enable",
    },
  },
});
