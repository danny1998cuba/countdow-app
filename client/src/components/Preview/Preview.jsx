import React, { useEffect, useState } from 'react'
import './preview.css'

export const Preview = ({ route, isLandscape = true, key = '' }) => {
  const [landscape, setLandscape] = useState(isLandscape)

  useEffect(() => {
    setLandscape(isLandscape)
  }, [isLandscape])

  useEffect(() => {
    const frame = document.getElementById(`preview_${key}`)
    frame.src = route
    frame.parentNode.replaceChild(frame.cloneNode(), frame)
  }, [route, key])


  return (
    <div className="preview-wrapper d-flex justify-content-center">
      <div className={`preview-orientation-adapter ${landscape ? 'landscape' : 'portrait'}`}>
        <iframe
          id={`preview_${key}`}
          className='preview'
          src={route}
          title='Preview'
        />
      </div>
    </div>
  )
}
