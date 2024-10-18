import { visionTool } from "@sanity/vision";
import { apiVersion } from "../config";

export const vision = visionTool({ defaultApiVersion: apiVersion });
