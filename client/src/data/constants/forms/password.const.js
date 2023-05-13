export const changePasswordFormInputs = [
    {
        type: 'header',
        text: 'Change password'
    },
    {
        name: 'username',
        value: '',

        placeholder: 'Type your username',
        label: 'Username',
        inline: 'false',

        type: 'text',

        validations: [
            {
                type: 'required',
                message: 'This field is required'
            },
            {
                type: 'minLength',
                value: 6,
                message: 'The username must have at least 6 letters'
            }
        ]
    },
    {
        name: 'password',
        value: '',

        placeholder: 'Type your password',
        label: 'Password',
        inline: 'false',

        type: 'password',

        validations: [
            {
                type: 'required',
                message: 'This field is required'
            },
            {
                type: 'minLength',
                value: 8,
                message: 'The password must have at least 8 letters'
            }
        ]
    },
    {
        name: 'newPassword',
        value: '',

        placeholder: 'Type your new password',
        label: 'New password',
        inline: 'false',

        type: 'password',

        validations: [
            {
                type: 'required',
                message: 'This field is required'
            },
            {
                type: 'minLength',
                value: 8,
                message: 'The password must have at least 8 letters'
            }
        ]
    },
    {
        type: 'submit',
        name: 'btn_smt',
        value: 'Submit'
    },
    {
        type: 'reset',
        name: 'btn_reset',
        value: 'Submit'
    }
]

export const forgotPasswordFormInputs = [
    {
        type: 'header',
        text: 'Change password'
    },
    {
        name: 'username',
        value: '',

        placeholder: 'Type your username',
        label: 'Username',
        inline: 'false',

        type: 'text',

        validations: [
            {
                type: 'required',
                message: 'This field is required'
            },
            {
                type: 'minLength',
                value: 6,
                message: 'The username must have at least 6 letters'
            }
        ]
    },
    {
        type: 'submit',
        name: 'btn_smt',
        value: 'Submit'
    }
]