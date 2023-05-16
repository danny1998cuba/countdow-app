import moment from "moment";

export const countdownFormInputs = (data) => {
    return [
        {
            type: 'header',
            text: 'Edit Countdown'
        },
        {
            name: "text",
            value: data?.text || "",

            placeholder: "Type the text",
            label: 'Text',

            type: "text",
            validations: [
                {
                    type: "required",
                    message: "This field is required"
                }
            ],
        },
        {
            name: "date",
            value: moment.utc(data?.date).format('YYYY-MM-DD') || "",

            placeholder: "Pick the date",
            label: 'Date',

            type: "date",
            validations: [
                {
                    type: "required",
                    message: "This field is required"
                }
            ],
        },
        {
            name: "back_portrait",
            value: data?.back_portrait || "",

            placeholder: "Url of the background portrait",
            label: 'Background portrait (optional)',

            type: "text",
            validations: [
                {
                    type: 'isUrl',
                    message: 'It should be a valid url'
                }
            ],
        },
        {
            name: "back_landscape",
            value: data?.back_landscape || "",

            placeholder: "Url of the background landscape",
            label: 'Background landscape (optional)',

            type: "text",
            validations: [
                {
                    type: 'isUrl',
                    message: 'It should be a valid url'
                }
            ],
        },
        {
            type: 'submit',
            name: 'btn',
            value: 'Submit'
        }
    ]
}
