"use client";

import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Heading, Label } from "../primitives/typography";
import { CheckIcon } from "lucide-react";
import { useCheckupForm } from "./checkup-form-provider";

type CheckupFormProps = Omit<ComponentProps<"div">, "children"> & {};

export const CheckupForm: FC<CheckupFormProps> = ({ className, ...restProps }) => {
  const { questions } = useCheckupForm();

  return (
    <div className={cn("flex flex-col gap-12", className)} {...restProps}>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <Heading size="sm">{question.question}</Heading>
          <div className={cn("mt-4 flex gap-2", { "flex-col": question.layout === "vertical" })}>
            {question.answers.map((answer, answerIndex) => (
              <Answer
                label={answer.answer}
                questionIndex={questionIndex}
                answerIndex={answerIndex}
                className="flex-1"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

type AnswerProps = ComponentProps<"button"> & {
  label: string;
  questionIndex: number;
  answerIndex: number;
};

export const Answer: FC<AnswerProps> = ({ className, label, questionIndex, answerIndex, ...restProps }) => {
  const { answers, updateAnswer } = useCheckupForm();

  const selected = answers[questionIndex] === answerIndex;

  return (
    <button
      className={cn(
        "flex items-center justify-between gap-4 rounded-xl border-2 border-neutral-900 px-4 py-3",
        {
          "border-primary-900 bg-primary-900 text-primary-900-text": selected,
          "hover:bg-neutral-100": !selected,
        },
        className,
      )}
      onClick={() => updateAnswer(questionIndex, selected ? null : answerIndex)}
      {...restProps}
    >
      <Label>{label}</Label>
      <CheckIcon className={cn("invisible", { visible: selected })} />
    </button>
  );
};
