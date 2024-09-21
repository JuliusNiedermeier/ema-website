import Image from "next/image";
import { FC, PropsWithChildren } from "react";

const OnlineApplicationLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="sticky top-0 flex-[30vh] border-r bg-primary-900 md:h-screen md:flex-1 md:p-4">
        <div className="relative h-full overflow-hidden md:rounded-xl">
          <Image
            src="/classroom.jpg"
            alt="Class"
            height="1000"
            width="1000"
            className="absolute left-0 top-0 h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="relative -mt-[2rem] flex-[70vh] rounded-t-[2rem] bg-primary-900 p-4 pt-8 md:-mt-0 md:flex-1 md:rounded-none md:pt-[10vh] xl:py-[10vh]">
        <div className="mx-auto my-auto h-full w-full max-w-[30rem] md:max-h-[50rem]">{children}</div>
      </div>
    </div>
  );
};

export default OnlineApplicationLayout;
