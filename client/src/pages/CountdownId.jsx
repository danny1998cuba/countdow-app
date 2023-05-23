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
    <div className="row w-100">
      <div className="col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
        <div className="counter-wrapper">
          <div className="counter-box">
            <p className='title'>{count.text}</p>
            <Counter date={count.date} />
          </div>
        </div>
      </div>
    </div>
  )
}
