import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Button } from 'react-bootstrap';
import ThankYou from '../components/ThankYou';
import { Option } from '../components/Option';
import Question from '../components/Question';

export default function QuestionPage() {

  const { search } = useLocation();
  const name = new URLSearchParams(search).get('name');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [setbackGuess, setSetbackGuess] = useState('');
  const [showSetback, setShowSetback] = useState(false);
  const [currentSetbackIndex, setCurrentSetbackIndex] = useState(0);
  const [score, setScore] = useState(0);

  const [setbackSeconds, setSetbackSeconds] = useState(30);

  const validateAnswer = (answer) => {
    if (guess === answer) {
      setScore(score + 1);
    } else {
      setShowSetback(true);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  const validateSetBackAnswer = (answer) => {
    if (setbackGuess === answer) {
      setScore(score + 0.5);
    }
    setShowSetback(false);
    setCurrentSetbackIndex(currentSetbackIndex + 1);
  }

  const checkRadioBtnChange = (event) => {
    setGuess(event.target.value);
  }

  const checkSetbackRadioBtnChange = (event) => {
    setSetbackGuess(event.target.value);
  }

  return (
    <div className="container-fluid p-4">
      {currentQuestionIndex === questions.length ? <ThankYou score={score} name={name} /> : <>
        <div>
          Hello {name}!!! Welcome to the Flagship event of DOT Club. All the Best
        </div>
        <div>Score: {score}</div>
        <div className="row no-gutters">
          {showSetback
            && (
              Setback_Questions.map((setbackQuestion, i) => i === currentSetbackIndex && (
                <Question
                  type="setback"
                  question={setbackQuestion}
                  id={i}
                  option={Setback_Options}
                  timerCount={30}
                  onOptionSelection={(event) => checkSetbackRadioBtnChange(event)}
                  onAnswerSubmit={() => validateSetBackAnswer(setbackQuestion.answer)}
                  onTimerEnd={() => validateSetBackAnswer(null)}
                />
              ))
            )}
          {!showSetback && (
            questions.map((question, i) => i === currentQuestionIndex && (
              <Question
                type="question"
                question={question}
                id={i}
                option={options}
                timerCount={60}
                onOptionSelection={(event) => checkRadioBtnChange(event)}
                onAnswerSubmit={() => validateAnswer(question.answer)}
                onTimerEnd={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              />
            ))
          )}
        </div>
      </>}
    </div>
  )
}




const questions = [
  { "question": "Alien Pk and Alien Dhoop are travelling to earth.Alien dhoop is the son of Alien pk but alien pk is not the father of Alien dhoop. What is the relation between alien dhoop and alien pk ? : ", "answer": "C" },
  { "question": "If on planet earth 31 March 2017 is a Saturday,find the day of the week on 1 january 2014 : ", "answer": "B" },
  { "question": "You travel three different distance  from the space station 10 km 20 km and 30 km  at a speed of 1/2km hr,1/3km/hr and 1km /hr respectively.What is the ratio of the time taken for the distances given ?: ", "answer": "D" },
  { "question": "ALL MOONS ARE STARS.B.ALL STARS ARE GALAXIES C.NO STARS ARE PLANETS  : \n  CON 1-SOME PLANETS ARE GALAXIES \n  CON 2-NO PLANET IS A GALAXY", "answer": "C" },
  { "question": "PARAJUMBLE \n A. Later this month, if all goes according to plan, a rocket called the Falcon Heavy will take off from Cape Canaver-al, in Florida \n B. Its mission is to put a sports car in orbit around the sun. \n C. The Falcon Heavy is the latest product of SpaceX, a firm founded by Elon Musk, an American billionaire. \n D. Before then, the Falcon Heavy may earn its keep lifting satellites and carrying tourists on slingshot trips around the moon. \n E. The car is Mr Musk's own, made by Tesla, another of his businesses. \n F. SpaceX has the explicit aim, besides making money, of enabling people to travel to and colonise Mars ", "answer": "D" },

  { "question": "Aliens Pintu and Chintu are buying a new spaceship which runs at a speed of 90 km/hr. If the speed of the spaceship reduces constantly by 10% of initial speed each year then what will be the speed at which it will run after two years ?: ", "answer": "A" },
  { "question": "How is alien Pintu’s mother’s niece’s father related to Pintu ? : ", "answer": "B" },
  { "question": "Pointing to a baby alien, Alien Mintali said “He is the only grandson of my grandfather”. How is the boy related to Mintali ?: ", "answer": "C" },
  { "question": "CUP : LIP :: BIRD :", "answer": "C" },
  { "question": "Two tickets from planet A to B and three tickets from planet A to C cost Rs. 77 but three tickets from planet A to B and two tickets from planet A to C cost Rs. 73. What are the fares for planets B and C from A ?: ", "answer": "D" },
  { "question": "If 2048 people entered a statewide singles tennis tournament,how many total matches would be played ,including the championship match ? : ", "answer": "B" },

]

const options = [
  ["A. MOTHER", "B. BROTHER", "C. FATHER", "D. SISTER"],
  ["A. TUESDAY", "B. THURSDAY", "C. MONDAY", "D. SUNDAY"],
  ["A. 2:3:6", "B. 3:2:6", "C. 1:2:3", "D. 2:6:3"],
  ["A. Only Conclusion 1 Follows", "B. Only Conclusion 2 Follows", "C. Both Conclusion Follows", "D. None Follows"],
  ["A. ABCDEF", "B. ACDEFB", "C. AFDCEB", "D. NONE OF THESE"],

  ["A. 72", "B. 26", "C. 99", "D. 81"],
  ["A. COUSIN", "B. UNCLE", "C. NEPHEW", "D. SON"],
  ["A. SON", "B. UNCLE", "C. BROTHER", "D. NONE OF THESE"],
  ["A. GRASS", "B. FOREST", "C. BEAK", "D. BOOK"],
  ["A. 20", "B. 22", "C. 26", "D. 30"],
  ["A. Rs. 14, Rs. 23", "B. Rs. 25, Rs. 24", "C. Rs. 17, Rs. 30", "D. Rs. 13, Rs. 17"],
  ["A. 2045", "B. 2047", "C. 2046", "D. 2048"],

]

const Setback_Questions = [
  { "question": "Which of these planets has no moons ? : ", "answer": "C" },
  { "question": "Right now, which of these is further from the Sun ? : ", "answer": "B" },
  { "question": "Which of these is the moon of Jupiter ? : ", "answer": "A" },
  { "question": "WHICH OF THESE IS LARGEST OBJECT IN THE ASTEROID BELT - ? : ", "answer": "D" },
  { "question": "OTE, PUF, QVG, RWH ? : ", "answer": "B" },
  { "question": "What four-letter word can be placed in front of each of the following words to form new words ? : ", "answer": "B" },
  { "question": "Safe : Secure :: Protect : ? : ", "answer": "D" },
  { "question": "Pointing out to jadoo, krissh  said, 'He is the Son-in-law of the grandmother of my father's only son.' How is that man related to the krissh ? : ", "answer": "D" },
  { "question": "Pintu found 80 chocolates in Nebula and returned home with them. If he has 7 siblings then how many chocolates each of the siblings in the family get ? : ", "answer": "C" },
]

const Setback_Options = [["A. VENUS", "B. NEPTUNE", "C. MERCURY", "D. URANUS"],
["A. NEPTUNE", "B. PLUTO", "C. MERCURY", "D. VENUS"],
["A. LO", "B. ENCELADUS ", "C. URANUS", "D. NONE OF THESE"],
["A. MAKEMAKE ", "B. URANUS", "C. MARS", "D. CERES"],
["A. SXJ", "B. SXI", "C. SYJ", "D. TCI"],
["A. LINE", "B. HEAD", "C. WATERS", "D. PHONE"],
["A. Lock", "B. Sure ", "C. Conserve", "D. Guard"],
["A. BROTHER", "B. FATHER", "C. UNCLE", "D. CANNOT BE DETERMINED"],
["A. 12", "B. 14 ", "C. 10", "D. 8"],
]