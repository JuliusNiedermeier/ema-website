import { groq } from "next-sanity";
import { FC, PropsWithChildren } from "react";
import { sanity } from "~/sanity/lib/client";
import { GoLayoutQueryResult } from "../../../../../../generated/sanity/types";

const goLayoutQuery = groq`*[_type == "home-page"][0]{
    video{asset->{url}},
  }`;

const GoLayout: FC<PropsWithChildren> = async ({ children }) => {
  const data = await sanity.fetch<GoLayoutQueryResult>(goLayoutQuery);

  return (
    <div className="h-[100svh] overflow-hidden bg-neutral-200 lg:grid lg:grid-cols-[1fr_2fr]">
      <div className="sticky top-0 hidden h-full lg:block">
        <video
          playsInline
          autoPlay
          muted
          loop
          src={data?.video?.asset?.url || ""}
          className="h-full w-full bg-primary-900 object-cover"
        />
      </div>

      <div className="h-full overflow-y-auto overflow-x-hidden lg:z-10 lg:-ml-8 lg:rounded-l-3xl lg:bg-neutral-200">
        {children}
      </div>
    </div>
  );
};

export default GoLayout;
