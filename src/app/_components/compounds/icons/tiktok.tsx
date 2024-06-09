import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";

export type TikTokIconProps = ComponentProps<"svg"> & {};

export const TikTokIcon: FC<TikTokIconProps> = ({ className, ...restProps }) => {
  return (
    <svg className={cn("", className)} width="24" height="24" viewBox="0 0 48 48" fill="none" {...restProps}>
      <path
        d="M34.1451 0H26.0556V32.6956C26.0556 36.5913 22.9444 39.7913 19.0725 39.7913C15.2007 39.7913 12.0894 36.5913 12.0894 32.6956C12.0894 28.8696 15.1315 25.7391 18.8651 25.6V17.3913C10.6374 17.5304 4 24.2783 4 32.6956C4 41.1827 10.7757 48 19.1417 48C27.5075 48 34.2833 41.1131 34.2833 32.6956V15.9304C37.3255 18.1565 41.059 19.4783 45 19.5479V11.3391C38.9157 11.1304 34.1451 6.12173 34.1451 0Z"
        fill="currentColor"
      />
    </svg>
  );
};
