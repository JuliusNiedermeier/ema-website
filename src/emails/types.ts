import { FC } from "react";

export interface EmailFC<P = {}> extends FC<P> {
  PreviewProps: P;
}
