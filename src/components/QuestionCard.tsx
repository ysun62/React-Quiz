import React from "react";

import { AnswerObject } from "../App";
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";

type Props = {
  question: string;
  answers: string[];
  checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  checkAnswer,
  userAnswer,
  questionNr,
  totalQuestions,
}) => {
  return (
    <Wrapper>
      <p>
        Question: {questionNr}/{totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{__html: question}} />
      <div>
        {answers.map((answer, index) => (
          <ButtonWrapper
            key={index}
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
          >
            <button
              disabled={!!userAnswer}
              value={answer}
              onClick={checkAnswer}
            >
              <span dangerouslySetInnerHTML={{__html: answer}} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};

export default QuestionCard;
