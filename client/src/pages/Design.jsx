import React, { useEffect, useState } from 'react'
import { growl } from '@crystallize/react-growl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPortrait, faImage } from '@fortawesome/free-solid-svg-icons'
import { DynamicForm } from 'd98c_dynamic-forms'

import { Preview } from '../components'
import { CountdownService } from '../data/services'
import { countdownFormInputs } from '../data/constants/forms'
import { StylingFunctions } from '../helpers'
import { Layout } from './Layout'
import { assign } from 'lodash'

export const Design = ({ protectedData }) => {
  console.log(protectedData);
  const [form, setForm] = useState(countdownFormInputs(protectedData))

  const [countdown, setCountdown] = useState(assign({}, protectedData))

  const [landscape, setLandscape] = useState(true)
  const [route, setRoute] = useState(`/#/countdown/${protectedData._id}`)


  useEffect(() => {
    StylingFunctions.formStyling()
  }, [form])

  const save = async (object, cancelled) => {
    try {
      setRoute('')
      let countBack = await CountdownService.update(countdown._id, object)
      setCountdown(countBack)
      setRoute(`/#/countdown/${countdown._id}`)

      let message

      if (cancelled) {
        setForm(countdownFormInputs(protectedData))
        StylingFunctions.formStyling()
        message = 'The changes were cancelled'
        await growl({
          title: 'Cancelled',
          message: message.toString(),
          type: 'warning'
        })
      } else {
        message = `Countdown ${countBack._id} modified!`
        await growl({
          title: 'Success',
          message: message.toString(),
          type: 'info'
        })
      }
    } catch (error) {
      await growl({
        title: 'Update Error',
        message: error.toString(),
        type: 'error'
      })
    }
  }


  const handleSubmit = async (values) => {
    await save(values, false)
  }

  const handleCancel = async () => {
    setForm(null)
    await save(protectedData, true)
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

            <button className={`btn btn-primary w-100`}
              onClick={handleCancel}>
              Cancel changes
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
                <Preview route={route} isLandscape={landscape} />
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  )
}
