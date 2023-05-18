import React, { useEffect, useState } from 'react'
import { growl } from '@crystallize/react-growl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPortrait, faImage } from '@fortawesome/free-solid-svg-icons'
import { DynamicForm } from 'd98c_dynamic-forms'
import moment from 'moment'
import { useParams } from 'react-router-dom'

import { Preview } from '../components'
import { CountdownService } from '../data/services'
import { countdownFormInputs } from '../data/constants/forms'
import { StylingFunctions } from '../helpers'
import { Layout } from './Layout'

export const Design = () => {
  const { id } = useParams()
  const [countdown, setCountdown] = useState({})
  const [preSaved, setPreSaved] = useState(null)
  const [form, setForm] = useState(null)
  const [landscape, setLandscape] = useState(true)
  const [preview, setPreview] = useState(null)
  const [route, setRoute] = useState('')

  
  useEffect(() => {
    const find = async () => {
      let count = await CountdownService.getOne(id)
      setCountdown(count)
      setPreview(count)
      setForm(countdownFormInputs(count))
      StylingFunctions.formStyling()
    }
    
    find()
    StylingFunctions.formStyling()
  }, [id])

  useEffect(() => {
    if (preSaved) {
      setPreview(preSaved)
    } else {
      setPreview(countdown)
    }
  }, [preSaved, countdown])

  useEffect(() => {
    if (preview) setRoute(`/#/countdown?date=${moment.utc(preview.date).format('YYYY-MM-DD')}`)
  }, [preview])



  const save = async () => {
    if (preSaved) {
      try {
        let countBack = await CountdownService.update(countdown._id, preSaved)
        let message = `Countdown ${countBack._id} modified!`
        setCountdown(countBack)
        setPreSaved(null)

        await growl({
          title: 'Success',
          message: message.toString(),
          type: 'info'
        })
      } catch (error) {
        await growl({
          title: 'Update Error',
          message: error.toString(),
          type: 'error'
        })
      }
    }
  }

  const handleSubmit = (values) => {
    setPreSaved(values)
    console.log(values);
  }

  return (
    <Layout title='Design' withLogin={false}>
      <>
        <div className="row mt-4">
          <div className="col-md-4 mb-4">
            {form && <DynamicForm
              formInputs={form}
              onSubmit={handleSubmit}
              resetOnSubmit={false} />}

            <button className={`btn btn-primary w-100 ${preSaved ? '' : 'disabled'}`}
              onClick={save}>
              Save changes
            </button>
          </div>
          <div className="col-md-8">
            <div className="row mb-4 ms-2">
              <div className="col-sm-4 mb-2">
                <p className='m-0 text-start text-sm-end'>Test background: </p>
              </div>
              <div className="col-sm-8 d-flex gap-3">
                <div className={`d-flex gap-2 icon ${!landscape ? 'active' : ''}`}
                  role='button'
                  onClick={() => setLandscape(false)}
                >
                  <FontAwesomeIcon
                    icon={faPortrait}
                    fontSize={25}
                    title='Portrait'
                    className={`icon ${!landscape ? 'active' : ''}`}
                  />
                  <p className='m-0'>Portrait </p>
                </div>
                <div className={`d-flex gap-2 icon ${landscape ? 'active' : ''}`}
                  onClick={() => setLandscape(true)}
                  role='button'
                >
                  <FontAwesomeIcon
                    icon={faImage}
                    fontSize={25}
                    title='Landscape'
                  />
                  <p className='m-0'>Landscape </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                {preview &&
                  <Preview route={route} isLandscape={landscape} />
                }
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  )
}
