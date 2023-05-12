import { DynamicForm } from 'd98c_dynamic-forms'
import React, { useContext, useEffect, useState } from 'react'

import { loginFormInputs } from '../data/constants/forms'
import { StylingFunctions } from '../helpers'
import { AuthContext } from '../context'

export const Login = () => {
    const [signin, setSignin] = useState(true)
    const {
        logged, user,
        handleLogin, handleLogout
    } = useContext(AuthContext)

    useEffect(() => {
        StylingFunctions.formStyling()
    }, [])

    useEffect(() => {
        StylingFunctions.formStyling()
    }, [signin, logged])


    return (
        <>
            <div className='login'>
                <div className="container py-3 px-4 d-flex justify-content-center align-items-center flex-column">

                    {
                        logged ?
                            <>
                                <p>Welcome, {user ? user.username : 'username'}</p>
                                <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                            </> :
                            <>
                                <div className="options d-flex flex-row align-items-center justify-content-evenly gap-3 mb-4">
                                    <p className={`item ${signin && 'selected'}`} onClick={() => setSignin(true)}>Sign In</p>
                                    <p className={`item ${!signin && 'selected'}`} onClick={() => setSignin(false)}>Sign Up</p>
                                </div>

                                <DynamicForm
                                    formInputs={loginFormInputs(signin)}
                                    onSubmit={(values) => handleLogin(values, signin)}
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
