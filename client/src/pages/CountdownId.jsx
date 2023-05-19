import React, { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'

import { Counter } from '../components';
import { StylingFunctions } from '../helpers';

export const CountdownId = () => {
  const count = useLoaderData()

  useEffect(() => {
    const handleWindowResize = () => {
      let portrait = window.innerHeight > window.innerWidth;
      StylingFunctions.setRootBackground(portrait ? count.back_portrait : count.back_landscape, false)
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
        <p className='title'>{count.text}</p>
        <Counter date={count.date} />
      </div>
    </div>
  )
}
