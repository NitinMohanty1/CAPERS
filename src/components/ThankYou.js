import axios from 'axios'
import React, { useEffect } from 'react'

export default function ThankYou({ name, score }) {

  useEffect(() => {
    console.log({name, score});
    axios.post('https://sheet.best/api/sheets/f31b1449-a291-42e1-9613-4151d9f922e9', {
      name,
      score
    })
  }, []);

  return (
    <div>
      Your final score is {score} out of 11. Thank you {name}!!!
    </div>
  )
}
