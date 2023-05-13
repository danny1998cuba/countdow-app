import { DynamicForm } from 'd98c_dynamic-forms'
import React from 'react'
import { emailFormInputs } from '../data/constants/forms'
import { AuthService } from '../data/services'
import { growl } from '@crystallize/react-growl'

export const ChangeEmail = ({ user }) => {
    const handleSubmit = async (values) => {
        try {
            let userBack = await AuthService.changeEmail(user, values)
            let message = `${userBack.username}: Your email has been changed to ${userBack.email}`

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

    return (
        <>
            <h3>Change email address</h3>
            <p className="small">
                Your current email is <i>{user.email}</i>. Set a new email
                in the form below. If you forget your password, you will receive
                a new one through this address.
            </p>
            <DynamicForm formInputs={emailFormInputs}
                onSubmit={handleSubmit} />
        </>
    )
}
