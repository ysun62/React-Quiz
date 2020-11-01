import React, { useState } from "react";

import { fetchQuizQuestions, Difficulty, QuestionState } from "./API";
import QuestionCard from "./components/QuestionCard";
import { GlobalStyle, Wrapper } from "./App.styles";

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [category, setCategory] = useState("11")
  const [categoryName, setCategoryName] = useState("Film")

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.easy,
      category
    );

    setQuestions(newQuestions);
    setQuestionIdx(0);
    setUserAnswers([]);
    setScore(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = answer === questions[questionIdx].correct_answer;

      if (correct) setScore((prev) => prev + 1);

      const answerObj = {
        question: questions[questionIdx].question,
        answer,
        correct,
        correctAnswer: questions[questionIdx].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObj]);
    }
  };

  const nextQuestion = () => {
    const nextQuestionIdx = questionIdx + 1;

    if (nextQuestionIdx === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setQuestionIdx(nextQuestionIdx);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper className="App">
        <h1>Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <>
            <select name="trivia_category" value={category} onChange={(e) => {setCategory(e.target.value); 
              setCategoryName(e.target.options[e.target.selectedIndex].innerHTML)}}>
              <option value="11">Film</option>
              <option value="12">Music</option>
              <option value="18">Computers</option>
              <option value="19">Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
            </select>
            <button className="start" onClick={startQuiz}>
              Start
            </button>
          </>
        ) : null}
        {!gameOver && <p className="score">Score: {score}</p>}
        {loading && <p>Loading Questions...</p>}
        {!loading && !gameOver && questions.length !== 0 ? (
          <QuestionCard
            categoryName={categoryName}
            question={questions[questionIdx].question}
            answers={questions[questionIdx].answers}
            checkAnswer={checkAnswer}
            userAnswer={userAnswers ? userAnswers[questionIdx] : undefined}
            questionNr={questionIdx + 1}
            totalQuestions={TOTAL_QUESTIONS}
          />
        ) : null}
        {!loading &&
        !gameOver &&
        userAnswers.length === questionIdx + 1 &&
        questionIdx !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
}

export default App;
