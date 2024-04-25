import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";

export type SiteLogoProps = ComponentProps<"div"> & {
  show?: "mark" | "text" | "both";
};

export const SiteLogo: FC<SiteLogoProps> = ({ className, show = "both", ...restProps }) => {
  return (
    <div className={cn("text-primary-foreground flex items-center gap-4 font-bold", className)} {...restProps}>
      {(show === "mark" || show === "both") && <LogoSVG />}
      {(show === "text" || show === "both") && (
        <div>
          <span className="font-bold">Emil Molt</span>
          <span className="ml-2 font-bold text-neutral-200-text-muted">Akademie</span>
        </div>
      )}
    </div>
  );
};

const LogoSVG: FC = () => {
  return (
    <svg width="32" viewBox="0 0 43 49" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M40 3L18.8121 19.7619L9.3697 8.82011M2 26.0476H14.4364L16.5091 47M37.697 15.3386L23.8788 26.0476L28.0242 34.4286"
        stroke="#2F5342"
        strokeWidth="3"
        strokeLinecap="square"
      />
    </svg>
  );
};
