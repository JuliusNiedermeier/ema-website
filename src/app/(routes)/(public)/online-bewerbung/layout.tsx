import { groq } from "next-sanity";
import Image from "next/image";
import { FC, PropsWithChildren } from "react";
import { sanityFetch } from "~/sanity/lib/client";
import { OnlineApplicationLayoutQueryResult } from "../../../../../generated/sanity/types";

const onlineApplicationLayoutQuery = groq`*[_type == "application-page"][0] {
  title,
  heroImage { alt, asset -> { url } }
}`;

const OnlineApplicationLayout: FC<PropsWithChildren> = async ({ children }) => {
  const data = await sanityFetch<OnlineApplicationLayoutQueryResult>(onlineApplicationLayoutQuery, {
    tags: ["application-page"],
  });

  return (
    <div className="min-h-[100svh] flex-col md:flex md:flex-row">
      <div className="sticky top-0 hidden h-screen flex-1 bg-primary-900 p-4 md:block">
        <div className="relative h-full overflow-hidden md:rounded-xl">
          <Image
            src={data?.heroImage?.asset?.url || ""}
            alt={data?.heroImage?.alt || ""}
            height="1000"
            width="1000"
            className="absolute left-0 top-0 h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="relative min-h-[100svh] flex-1 bg-primary-900">
        <div className="mx-auto max-w-[30rem] [&>*]:min-h-[100svh]">{children}</div>
      </div>
    </div>
  );
};

export default OnlineApplicationLayout;
