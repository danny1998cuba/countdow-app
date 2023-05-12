import { DynamicForm } from 'd98c_dynamic-forms'
import React, { useEffect, useState } from 'react'

import { TOKEN_HEADER, USER_KEY } from '../data/constants/storage.keys'
import { loginFormInputs } from '../data/constants/forms'
import { AuthService, StorageService } from '../data/services'
import { StylingFunctions } from '../helpers'

export const Login = () => {
    const [signin, setSignin] = useState(true)
    const [logged, setLogged] = useState(false)
    const [user, setUser] = useState(null)

    const handleSubmit = async (values) => {
        try {
            let token
            if (signin) {
                token = await AuthService.signin(values)
            } else {
                token = await AuthService.signup(values)
            }

            StorageService.setItemSession(TOKEN_HEADER, token)
            let user = await AuthService.profile()
            StorageService.setItemSession(USER_KEY, user)
            setUser(user)
            setLogged(true)
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogOut = () => {
        StorageService.removeItemSession(TOKEN_HEADER)
        StorageService.removeItemSession(USER_KEY)
        setLogged(false)
        setUser(null)
    }

    useEffect(() => {
        setLogged(StorageService.isInSession(TOKEN_HEADER))
        setUser(StorageService.getItemSession(USER_KEY))
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
