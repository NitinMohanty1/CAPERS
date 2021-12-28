import React, { useState,useEffect } from 'react'
import { useLocation } from 'react-router'
import ThankYou from '../components/ThankYou';
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
  const [clue, setClue] = useState('');
	
	useEffect(() => {
    const initialQuestionIndex = +sessionStorage.getItem('currentQuestionIndex') || 0;
    const initialSetbackQuestionIndex = +sessionStorage.getItem('currentSetbackIndex') || 0;
    const initialScore = +sessionStorage.getItem('score') || 0;
    setCurrentQuestionIndex(initialQuestionIndex);
    setCurrentSetbackIndex(initialSetbackQuestionIndex);
    setScore(initialScore);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('currentQuestionIndex', currentQuestionIndex);
  }, [currentQuestionIndex]);

  useEffect(() => {
    sessionStorage.setItem('currentSetbackIndex', currentSetbackIndex);
  }, [currentSetbackIndex]);

  useEffect(() => {
    sessionStorage.setItem('score', score);
  }, [score]);


  const validateAnswer = (answer, clue) => {
    if (guess === answer) {
      setScore(score + 10);
      setClue(clue);
    } else {
      setShowSetback(true);
      setClue('');
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  const validateSetBackAnswer = (answer) => {
    if (setbackGuess === answer) {
      setScore(score + 5);
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
    <div className="container-fluid p-4 content disableselect">
      {currentQuestionIndex === questions.length ? <ThankYou score={score} name={name} /> : <>
        <div>
          Hello {name}. Welcome to Trivia the major event by DOT club for TRISHNA, the annual cultural fest of IBS Hyderabad. All the Best...!!!
        </div>
        <div>Score: {score}</div>
        {!!clue && <div style={{color:'green',fontSize:'20px',fontWeight:'bold'}}>Clue: {clue}</div>}
        <div className="row no-gutters">
          {showSetback
            && (
              Setback_Questions.map((setbackQuestion, i) => i === currentSetbackIndex && (
                <div>
                  <div style={{color:'red',fontSize:'20px',fontWeight:'bold'}}>Setback Question</div>
                  <Question
                    type="setback"
                    question={setbackQuestion}
                    id={i}
                    option={Setback_Options}
                    timerCount={300}
                    onOptionSelection={(event) => checkSetbackRadioBtnChange(event)}
                    onAnswerSubmit={() => validateSetBackAnswer(setbackQuestion.answer)}
                    onTimerEnd={() => validateSetBackAnswer(null)}
                  />
                </div>
              ))
            )}
          {!showSetback && (
            questions.map((question, i) => i === currentQuestionIndex && (
              <Question
                type="question"
                question={question}
                id={i}
                option={options}
                timerCount={300}
                onOptionSelection={(event) => checkRadioBtnChange(event)}
                onAnswerSubmit={() => validateAnswer(question.answer, question.clue)}
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
  { "question": "Alien Pk and Alien Jaadu are travelling to Earth. Alien dhoop is the son of Alien Pk but alien Pk is not the father of Alien dhoop. What is the relation between alien dhoop and alien pk? ", "answer": "D", "clue": "A" },
  { "question": "If on planet earth 31 March 2017 is a Saturday, find the day of the week on 1 January 2014? ", "answer": "C", "clue": "DC" },
  { "question": "You travel three different distance from the space station 10 km, 20 km and 30 km at a speed of 1/2km hr, 1/3 km/hr and 1 km/hr respectively. What is the ratio of the time taken for the distances given? ", "answer": "A", "clue": "EF" },
  { "question": "ALL MOONS ARE STARS.  B.ALL STARS ARE GALAXIES  C.NO STARS ARE PLANETS  : <br>  CON 1-SOME PLANETS ARE GALAXIES <br>  CON 2-NO PLANET IS A GALAXY", "answer": "C", "clue": "B" },
  { "question": "PARAJUMBLE <br> A. Later this month, if all goes according to plan, a rocket called the Falcon Heavy will take off from Cape Canaver-al, in Florida. <br> B. Its mission is to put a sports car in orbit around the sun. <br> C. The Falcon Heavy is the latest product of SpaceX, a firm founded by Elon Musk, an American billionaire. <br> D. Before then, the Falcon Heavy may earn its keep lifting satellites and carrying tourists on slingshot trips around the moon. <br> E. The car is Mr Musk's own, made by Tesla, another of his businesses. <br> F. SpaceX has the explicit aim, besides making money, of enabling people to travel to and colonise Mars.", "answer": "D", "clue": "" },


  { "question": "Aliens Jaadu and Pk are buying a new spaceship which runs at a speed of 90 km/hr. If the speed of the spaceship reduces constantly by 10% of initial speed each year then what will be the speed at which it will run after two years? ", "answer": "B", "clue": "AE" },
  { "question": "How is alien Jaadu,s mother’s niece’s father related to Pk? ", "answer": "D", "clue": "B" },
  { "question": "Pointing to a baby alien, Alien Pk said 'He is the only grandson of my grandfather'. How is the alien related to Pk?", "answer": "A", "clue": "DC" },
  { "question": "Alien Pk landed in a new planet Nebula in search of his friend jaadu who is in exactly opposite direction to Pk and the distance between them is 100 meters,<br> Since pk was not aware of this he started moving randomly. If jaadu is standing in the east direction and moves 50 m towards south, 90 m towards west and 50 m towards north,<br> what is the distance between jaadu and Pk?", "answer": "B", "clue": "F" },
  { "question": "PARAJUMBLE <br> A. The Indian Space Research Organization (ISRO) crossed an important milestone with the successful launch of weather satellite INSAT-3DR using a Geosynchronous Satellite Launch Vehicle (GSLV) equipped with the indigenous cryogenic upper stage.<br> B. The September 8 GSLV launch marks the third consecutive success; the fact that it is the first operational flight by the GSLV carrying the indigenous cryogenic upper stage is confirmation that India now belongs to the elite club of countries that have mastered the cryogenic technology.<br> C. Likewise, igniting a cryogenic fuel and sustaining the combustion for a prolonged period is a daunting task.<br> D. Maintaining structural and thermal integrity of the engine at very high temperatures during combustion just a few centimeters away from – 250° C, a temperature at which materials behave very differently, is a huge challenge.<br> E. This marks a departure from the long history of failures with the GSLV; except for the first, every launch of the Polar Satellite Launch Vehicle (PSLV), the workhorse of ISRO, has been a success.<br> F. The Thursday launch had fully utilized the maximum payload carrying capacity of the GSLV-Mk II by carrying the heaviest satellite (2,211 kg) ever from Indian soil.", "answer": "C", "clue": "" },

]

const options = [
  ["A. Nephew", "B. Uncle", "C. Brother", "D. Father"],
  ["A. Wednesday", "B. Friday", "C. Thurday", "D. Monday"],
  ["A. 2:6:3", "B. 3:2:6", "C. 1:2:3", "D. 1:3:6"],
  ["A. Only conclusion 1 follow", "B. Only conclusion 2 follow", "C. Both Conclusion follow", "D. Neither Conclusion follow"],
  ["A. CEFBAD", "B. FBADCE", "C. ADCEBF", "D. ADCEFB"],

  ["A. 26", "B. 72", "C. 81", "D. 99"],
  ["A. Son", "B. Nephew", "C. Cousin", "D. Uncle"],  
  ["A. Brother", "B. Uncle", "C. Data Inadequate", "D. None of these"],  
  ["A. 20", "B. 10", "C. 30", "D. 40"],
  ["A. AEDBCF", "B. DEABCF ", "C. AEBDCF", "D. FAEBCD"],
 ]

const Setback_Questions = [
  { "question": "Which of these planets has no moons ?", "answer": "B" },
  { "question": "Right now, which of these is further from the Sun? ", "answer": "A" },
  { "question": "Which of these is the moon of Jupiter ?", "answer": "B" },
  { "question": "Which of these is largest object in the asteroid belt ?", "answer": "B" },
  { "question": "The first flight of the space shuttle program by NASA was launched in ?", "answer": "B" },    

  { "question": "Which of these is the distance between Earth and the centre of the Milky Way galaxy ?"	, "answer": "B" },
  { "question": "Which galaxy is further away from Earth ?", "answer": "B" },
  { "question": "Which year was the first exoplanet discovered in ?", "answer": "A" },
  { "question": "Which of these is evidence for the big bang theory ?", "answer": "A" }, 
  { "question": "First space station ?", "answer": "B" }, 
]

const Setback_Options = [
["A. Uranus", "B. Mercury"],
["A. Pluto", "B. Neptune"],
["A. Enceladus", "B. LO-LO"],
["A. Makemake", "B. Ceres"],
["A. 1980", "B. 1981"],

["A. 250 light-years", "B. 25000 light-years"],
["A. Andromeda", "B. Large Magellanic cloud"],
["A. 1995", "B. 2005"],
["A. Observation of redshift of the distant galaxies", "B. The abundance of nitrogen in the earth’s atmosphere"],
["A. Sputnik 1", "B. Salyut 1"],
]