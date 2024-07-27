"use client";

import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Heading, Label } from "../../primitives/typography";
import { CheckIcon } from "lucide-react";
import { useCheckupForm } from "./checkup-form-provider";

type CheckupFormProps = Omit<ComponentProps<"div">, "children"> & {};

export const CheckupForm: FC<CheckupFormProps> = ({ className, ...restProps }) => {
  const { questions } = useCheckupForm();

  return (
    <div className={cn("flex flex-col gap-12", className)} {...restProps}>
      {questions.map((question) => (
        <div key={question.ID}>
          <Heading size="sm">{question.question}</Heading>
          <div className={cn("mt-4 flex gap-2", { "flex-col": question.layout === "vertical" })}>
            {question.answers.map((answer) => (
              <Answer
                key={answer.ID}
                label={answer.answer}
                questionID={question.ID}
                answerID={answer.ID}
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
  questionID: string;
  answerID: string;
};

export const Answer: FC<AnswerProps> = ({ className, label, questionID, answerID, ...restProps }) => {
  const { answers, updateAnswer, questions } = useCheckupForm();

  const selected = Boolean(answers[questionID]?.includes(answerID));

  const allowMutlipleAnswers = Boolean(questions.find((question) => question.ID === questionID)?.allowMutlipleAnswers);

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
      onClick={() => updateAnswer(questionID, answerID, !selected, allowMutlipleAnswers)}
      {...restProps}
    >
      <Label>{label}</Label>
      <CheckIcon className={cn("invisible", { visible: selected })} />
    </button>
  );
};
