import React, { useEffect, useState } from 'react'
import { Option } from './Option'
import { Button } from 'react-bootstrap';

export default function Question({
  type,
  question,
  option,
  onOptionSelection,
  onAnswerSubmit,
  id,
  timerCount,
  onTimerEnd
}) {

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log('called', type, timerCount);
    setSeconds(timerCount);
  }, []);

  useEffect(() => {

    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        onTimerEnd();
        setSeconds(timerCount);
      }
    }, 1000)
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <>
      <div>Timer: {seconds}</div>
      <div className="col-12 my-4" dangerouslySetInnerHTML={{__html:`${id + 1}.${question.question}`}}></div>
      <Option options={option} name={type} onChange={(event) => onOptionSelection(event)} id={id} />
      <Button style={{ width: '20%' }} onClick={() => onAnswerSubmit(question.answer)}>Submit</Button>
    </>
  )
}
