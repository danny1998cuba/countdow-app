export const loginFormInputs = [
        {
            type: 'header',
            text: 'Sign In'
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

    // if (!signin) {
    //     form.splice(2, 0, {
    //         type: "email",
    //         name: "email",
    //         placeholder: "Type your email",
    //         label: 'Email',
    //         value: "",
    //         validations: [
    //             {
    //                 type: "isEmail",
    //                 message: "Email no valid"
    //             },
    //             {
    //                 type: "required",
    //                 message: "This field is required"
    //             }
    //         ],

    //     })
    // }