import axios from 'axios'
import React, { useEffect,useState } from 'react'

export default function ThankYou({ name, score }) {
const [showLoading, setShowLoading] = useState(false);
const [showError, setShowError] = useState(false);
  useEffect(() => {
    if(!sessionStorage.getItem('submitted'))
	{
		setShowLoading(true)
    axios.post('https://sheet.best/api/sheets/1f070a94-eeac-4e42-a6c4-efa60aaa2daa', {
      name,
      score,
	  timestamp: new Date().toString()
    }).then(() => {
		setShowLoading(false)
		sessionStorage.setItem('submitted','true')
	})
	.catch(() => {setShowLoading(false);setShowError(true)}
	
	) 
	
	}
  }, []);

  return (
  <div style={{color:'Green',fontSize:'30px',fontWeight:'bold'}}>
	  <div>Your Final Score is {score}. Thank you {name}!!!</div>
  </div>
  )
}
