export const loginFormInputs = (signin) => [
    {
        type: 'header',
        text: signin ? 'Sign In' : 'Sign Up'
    },
    {
        name: 'username',
        value: '',

        placeholder: 'Type your username',
        label: 'Username',
        inline: 'false',

        type: 'text',

        //See validations section
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

        //See validations section
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
        name: 'btn',
        value: 'Submit'
    }
]