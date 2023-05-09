import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Layout } from './Layout'
import { Counter } from '../components';
import { StylingFunctions } from '../helpers';

export const Countdown = () => {
  const [query] = useSearchParams();
  const params = {}
  query.forEach((value, key) => params[key] = value)

  const [date, setDate] = useState(new Date())
  const [text, setText] = useState('Time to be together ❤️')
  const [back_portrait, setBack_portrait] = useState(`${process.env.PUBLIC_URL}/images/love_portrait.jpg`)
  const [back_landscape, setBack_landscape] = useState(`${process.env.PUBLIC_URL}/images/love_landscape.jpg`)


  useEffect(() => {
    let temp_date
    if (!params.date) {
      temp_date = new Date()
      temp_date.setDate(new Date().getDate() + 1)
    } else {
      temp_date = new Date(params.date)
      temp_date.setHours(temp_date.getUTCHours())
    }
    setDate(temp_date);

    if (params.text) {
      setText(query.text);
    }
    if (params.portrait) {
      setBack_portrait(query.portrait);
    }
    if (params.landscape) {
      setBack_landscape(query.landscape);
    }

    const handleWindowResize = () => {
      let portrait = window.innerHeight > window.innerWidth;
      StylingFunctions.setRootBackground(portrait ? back_portrait : back_landscape, false)
    }
    handleWindowResize()

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      StylingFunctions.removeRootBackground()
    }
  }, [])


  return (
    <div className="counter-wrapper">
      <div className="counter-box">
        <p className='title'>{text}</p>
        <Counter date={date} />
      </div>
    </div>
  )
}
