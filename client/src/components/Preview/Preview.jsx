import React, { useEffect, useState } from 'react'
import './preview.css'
import { Counter } from '../Counter'

export const Preview = ({ countdown, isLandscape = true }) => {
  const [landscape, setLandscape] = useState(isLandscape)

  useEffect(() => {
    setLandscape(isLandscape)
  }, [isLandscape])

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className={`preview ${landscape ? 'landscape' : 'portrait'}`}>
          <div className="background" style={{ '--back': 'transparent' }}></div>
          <div className="content">
            <div className="counter-box">
              <p className="title">{countdown?.text}</p>
              <Counter date={new Date(countdown?.date)} />
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
