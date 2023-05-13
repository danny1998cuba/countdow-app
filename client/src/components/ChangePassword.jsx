import React from 'react'
import { growl } from '@crystallize/react-growl'
import { DynamicForm } from 'd98c_dynamic-forms'

import { changePasswordFormInputs } from '../data/constants/forms'
import { AuthService } from '../data/services'

export const ChangePassword = () => {
  const handleSubmit = async (values) => {
    try {
      let message = await AuthService.changePassword(values)

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
      <h3>Change password</h3>
      <DynamicForm formInputs={changePasswordFormInputs}
        onSubmit={handleSubmit} />
    </>
  )
}
