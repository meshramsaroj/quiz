import React from 'react';
import { AnswerObject } from "../App"
import { ButtonWrapper } from './questionCard.style'

type Property = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNo: number;
  totalQuestion: number;

}


const QuestionCard: React.FC<Property> = ({ question, answers, callback, userAnswer, questionNo, totalQuestion }) => {

  console.log(userAnswer)
  return (

    <div>
      <p className="number ">
        Question : {questionNo} / {totalQuestion}
      </p>
      <div className=" box m-4 p-4 bg-light h-50 rounded w-75 m-auto">
        <p dangerouslySetInnerHTML={{ __html: question }} className="question bg-dark text-light justify-content-center" />
        <div className=" row  m-auto justify-content-center">
          {answers.map(answer => (
            <div
              className="col-md-6"
              key={answer}
            >
              <button className="btn btn-secondary w-100 my-3 p-3"
                value={answer}
                disabled={userAnswer ? true : false}
                onClick={callback}
              >
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </button>
            </div>
          ))}
        </div>
      </div>


    </div>
  )
}


export default QuestionCard;