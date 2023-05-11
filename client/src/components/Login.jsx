import { DynamicForm } from 'd98c_dynamic-forms'
import React, { useEffect, useState } from 'react'

import { loginFormInputs } from '../data/constants/forms'
import { AuthService, StorageService } from '../data/services'
import { StylingFunctions } from '../helpers'

export const Login = () => {
    const [signin, setSignin] = useState(true)
    const [logged, setLogged] = useState(false)

    const handleSubmit = (values) => {
        if (signin) {
            AuthService.signin(values).then(token => {
                StorageService.setItemSession('x-access-token', token)
                setLogged(true)
            }).catch(error => {
                console.log(error);
            })
        } else {
            AuthService.signup(values).then(token => {
                StorageService.setItemSession('x-access-token', token)
                setLogged(true)
            }).catch(error => {
                console.log(error);
            })
        }
    }

    const handleLogOut = () => {
        StorageService.removeItemSession('x-access-token')
        setLogged(false)
    }

    useEffect(() => {
        setLogged(StorageService.isInSession('x-access-token'))
    }, [])

    useEffect(() => {
        StylingFunctions.formStyling()
    }, [signin, logged])



    StylingFunctions.formStyling()

    return (
        <>
            <div className='login'>
                <div className="container py-3 px-4 d-flex justify-content-center align-items-center flex-column">

                    {
                        logged ?
                            <>
                                <p>Welcome, username</p>
                                <button className="btn btn-primary" onClick={handleLogOut}>Logout</button>
                            </> :
                            <>
                                <div className="options d-flex flex-row align-items-center justify-content-evenly gap-3 mb-4">
                                    <p className={`item ${signin && 'selected'}`} onClick={() => setSignin(true)}>Sign In</p>
                                    <p className={`item ${!signin && 'selected'}`} onClick={() => setSignin(false)}>Sign Up</p>
                                </div>

                                <DynamicForm
                                    formInputs={loginFormInputs(signin)}
                                    onSubmit={handleSubmit}
                                ></DynamicForm>

                                <div className="w-100 text-center small forgot-pass">
                                    Did you forget your password?
                                </div>
                            </>

                    }
                </div>
            </div>
        </>
    )
}
