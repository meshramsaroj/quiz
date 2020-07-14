import React, { useState } from 'react';
import QuestionCard from './component/questionCard';
import "bootstrap/dist/css/bootstrap.min.css"
import { fetchQuizData } from './API';
import { QuestionState, Difficulty } from "./API";
import goodluckEmoji from './images/good-luck.gif';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string
}

const TOTAL_QUESTIONS = 10;

function App() {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAns, setUserAns] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setgameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setgameOver(false);

    const newQuestion = await fetchQuizData(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestion);
    setScore(0);
    setUserAns([]);
    setNumber(0);
    setLoading(false);

  }

  const checkAns = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //user answer
      const answer = e.currentTarget.value;
      //check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      //add score if answer is correct
      if (correct) {
        setScore(prev => prev + 1);

      }
      //save answer in the array for user answer
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }

      setUserAns(prev => [
        ...prev,
        answerObject

      ])
    }
  }

  const nextQuestion = () => {
    //Move on to the next question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setgameOver(true);
    }
    else {
      setNumber(nextQuestion)
    }
  }

  return (
    <div className="container-fluid text-center text-light p-3">
      <h1 className="title">Quiz</h1>
      {gameOver || userAns.length === TOTAL_QUESTIONS ? (
        <div>
          <button className="start btn btn-success m-4 p-4 w-50" onClick={startQuiz}>Start</button>
          <img src={goodluckEmoji} alt="good luck" className="greeting p-5" />

        </div>
      )
        : null
      }

      {!gameOver ? <p className="score">Score: {score}</p> : null}

      {loading && <p>Loading....</p>}

      {!loading && !gameOver ?(
        <QuestionCard
          questionNo={number + 1}
          totalQuestion={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAns ? userAns[number] : undefined}
          callback={checkAns}
        />) :
        null
      }

      {!loading &&
        !gameOver &&
        userAns.length === number + 1 &&
        number !== TOTAL_QUESTIONS ?
        (
          <button
            className="next btn btn-dark text-light p-2 m-2 "
            disabled={!userAns && !gameOver}
            onClick={nextQuestion}>
            Next Question
            </button>
        ) :
     null
      }
    </div>
  );
}

export default App;
