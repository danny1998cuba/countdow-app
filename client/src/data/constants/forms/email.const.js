export const emailFormInputs = [
    {
        name: "email",
        value: "",

        placeholder: "Type your new email",
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
        type: 'submit',
        name: 'btn',
        value: 'Submit'
    }
]
