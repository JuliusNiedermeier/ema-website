import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import Image from "next/image";

export type PartnersBannerProps = ComponentProps<"div"> & {
  partners: { imageURL: string; name: string }[];
};

export const PartnersBanner: FC<PartnersBannerProps> = ({ className, partners, ...restProps }) => {
  return (
    <div className={cn("flex items-center gap-12 overflow-hidden", className)} {...restProps}>
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
  );
};
