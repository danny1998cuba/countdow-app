import React, { useContext, useEffect, useState } from 'react'
import { Layout } from './Layout'
import { StylingFunctions } from '../helpers'
import { AuthContext } from '../context'
import { ChangeEmail, ChangePassword, DeleteAccount } from '../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'

const settings_options = [
  {
    id: 'profile',
    name: 'Profile'
  },
  {
    id: 'other',
    name: 'Other'
  }
]

export const SettingsTab = ({ id }) => {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    StylingFunctions.formStyling()
  }, [])

  switch (id) {
    case 'profile':
      return <>
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <ChangePassword />
          </div>
          <div className="col-lg-4 col-md-6 d-none d-lg-block">
            <div className="image d-flex justify-content-center align-items-center h-100 w-100">
              <FontAwesomeIcon icon={faUserEdit} className='w-50 h-50' />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <ChangeEmail user={user} />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <DeleteAccount />
          </div>
        </div>
      </>
    default:
      return <p>{id}</p>
  }
}


export const Settings = () => {
  const [active, setActive] = useState('profile')

  return (
    <Layout title='Settings' withLogin={false}>
      <div className="row w-100 mt-4">
        <div className="col-12">
          <ul className="nav nav-tabs" id="navId" role="tablist">
            {
              settings_options.map(option => (
                <li className="nav-item" key={option.id}>
                  <div className={`nav-link ${active === option.id ? 'active' : ''}`}
                    data-bs-toggle="tab"
                    onClick={() => setActive(option.id)}
                  >{option.name}</div>
                </li>
              ))
            }
          </ul>

          <div className="tab-content" id="myTabContent">
            {
              settings_options.map(option => (
                <div className={`tab-pane mt-3 fade ${active === option.id ? 'active show' : ''}`}
                  id={option.id} key={`tab_${option.id}`} role="tabpanel">
                  {
                    <SettingsTab id={option.id} />
                  }
                </div>

              ))
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}
