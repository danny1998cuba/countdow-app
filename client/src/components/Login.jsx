import { DynamicForm } from 'd98c_dynamic-forms'
import React, { useEffect, useState } from 'react'
import { loginFormInputs } from '../data/constants/forms'
import { StylingFunctions } from '../helpers'

export const Login = () => {
    const [signin, setSignin] = useState(true)

    const handleSubmit = (values) => {
        if (signin) {
            console.log('Iniciar sesion');
            console.log(values);
        } else {
            console.log('Registro');
            console.log(values);
        }
    }

    useEffect(() => {
      StylingFunctions.formStyling()
    }, [signin])
    

    StylingFunctions.formStyling()

    return (
        <>
            <div className='login'>
                <div className="container py-3 px-4 d-flex justify-content-center align-items-center flex-column">
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
                </div>
            </div>
        </>
    )
}
