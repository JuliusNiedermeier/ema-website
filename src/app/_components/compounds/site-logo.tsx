import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import Image from "next/image";
import { VariantProps, cva } from "class-variance-authority";

const siteLogoVariants = cva("flex items-center gap-4", {
  variants: {
    light: {
      true: "text-neutral-900-text [&>div>span:nth-child(2)]:text-neutral-900-text-muted",
      false: "text-neutral-100-text [&>div>span:nth-child(2)]:text-neutral-100-text-muted",
    },
  },
  defaultVariants: { light: false },
});

export type SiteLogoProps = ComponentProps<"div"> &
  VariantProps<typeof siteLogoVariants> & {
    show?: "mark" | "text" | "both";
  };

export const SiteLogo: FC<SiteLogoProps> = ({ className, show = "both", light, ...restProps }) => {
  return (
    <div className={cn(siteLogoVariants({ light }), className)} {...restProps}>
      {/* {(show === "mark" || show === "both") && <LogoSVG />} */}
      {(show === "mark" || show === "both") && <Image src="/ema-logo.png" alt="Logo" width={50} height={50} />}
      {(show === "text" || show === "both") && (
        <div>
          <span className="font-bold">Emil Molt</span>
          <span className="ml-2">Akademie</span>
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
