export const registerFormInputs = [
    {
        type: 'header',
        text: 'Sign Up'
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
        name: "email",
        value: "",

        placeholder: "Type your email",
        label: 'Email',

        type: "email",
        validations: [
            {
                type: "isEmail",
                message: "Email no valid"
            },
            {
                type: "required",
                message: "This field is required"
            }
        ],
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