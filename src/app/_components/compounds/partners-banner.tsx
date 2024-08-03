import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import Image from "next/image";

export type PartnersBannerProps = ComponentProps<"div"> & {
  partners: { imageURL: string; name: string }[];
};

export const PartnersBanner: FC<PartnersBannerProps> = ({ className, partners, ...restProps }) => {
  return (
    <div
      style={{ "--gap": "3rem" }}
      className={cn("relative flex select-none items-center gap-[var(--gap)] overflow-hidden", className)}
      {...restProps}
    >
      {Array.from(new Array(2)).map((_, index) => (
        <div key={index} className="animate-marqueeScroll flex min-w-full shrink-0 justify-around gap-[var(--gap)]">
          {partners.map((partner) => (
            <Image
              key={partner.name}
              height={500}
              width={500}
              src={partner.imageURL}
              alt={partner.name}
              className="h-8 w-min object-contain mix-blend-multiply"
            />
          ))}
        </div>
      ))}

      {Array.from(new Array(2)).map((_, index) => (
        <div
          key={index}
          className={cn("absolute top-0 h-full w-1/12 from-neutral-100", {
            "left-0 bg-gradient-to-r": index === 0,
            "right-0 bg-gradient-to-l": index === 1,
          })}
        />
      ))}
    </div>
  );
};
