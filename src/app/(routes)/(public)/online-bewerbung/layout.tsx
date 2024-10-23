import { groq } from "next-sanity";
import Image from "next/image";
import { FC, PropsWithChildren } from "react";
import { sanityFetch } from "~/sanity/lib/client";
import { OnlineApplicationLayoutQueryResult } from "../../../../../generated/sanity/types";
import { SanityImage } from "~/app/_components/primitives/sanity-image";

const onlineApplicationLayoutQuery = groq`*[_type == "application-page"][0] {
  title,
  heroImage
}`;

const OnlineApplicationLayout: FC<PropsWithChildren> = async ({ children }) => {
  const data = await sanityFetch<OnlineApplicationLayoutQueryResult>(onlineApplicationLayoutQuery, {
    tags: ["application-page"],
  });

  return (
    <div className="min-h-[100svh] flex-col md:flex md:flex-row">
      <div className="sticky top-0 hidden h-screen flex-1 bg-primary-900 p-4 md:block">
        <div className="relative h-full overflow-hidden md:rounded-xl">
          <SanityImage image={data?.heroImage} fill />
        </div>
      </div>
      <div className="relative min-h-[100svh] flex-1 bg-primary-900">
        <div className="mx-auto max-w-[30rem] [&>*]:min-h-[100svh]">{children}</div>
      </div>
    </div>
  );
};

export default OnlineApplicationLayout;
