import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { TestimonialCard, TestimonialCardCoreProps } from "./testimonial-card";
import { ProgressProvider } from "../primitives/progress-provider";
import { ScrollProgress } from "../primitives/scroll-progress";
import { CardCarousel, CardCarouselItem } from "../primitives/card-carousel";
import { ProgressBar, ProgressBarIndicator } from "../primitives/progress-bar";

export type TestimonialCarouselProps = ComponentProps<"div"> & {
  testimonials: TestimonialCardCoreProps[];
};

export const TestimonialCarousel: FC<TestimonialCarouselProps> = ({ testimonials, ...restProps }) => {
  return (
    <div {...restProps}>
      <ProgressProvider>
        <ScrollProgress className="scrollbar-none overflow-x-auto" asChild>
          <CardCarousel>
            {testimonials.map((testimonial, index) => (
              <CardCarouselItem key={index} asChild>
                <TestimonialCard key={index} {...testimonial} className={cn("min-w-[90%] snap-start md:min-w-[40%]")} />
              </CardCarouselItem>
            ))}
          </CardCarousel>
        </ScrollProgress>
        <ProgressBar className="mx-8 mt-4">
          <ProgressBarIndicator />
        </ProgressBar>
      </ProgressProvider>
    </div>
  );
};
