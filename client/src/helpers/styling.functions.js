export const setRootBackground = (background_input, isColor) => {
    const root = document.getElementById('root')

    if (isColor) {
        let background = `#${background_input})`
        root.style.backgroundColor = background
    } else {
        let background = `url(.${background_input})`
        root.style.backgroundImage = background
    }
}

export const removeRootBackground = () => {
    const root = document.getElementById('root')
    root.style.background = ''
}

export const formStyling = () => {
    // headers
    let headers = [...document.querySelectorAll('.section-header')]

    headers.forEach(header => {
        header.classList.add('w-100')
        header.classList.add('text-center')
        header.classList.add('mb-3')
    })

    // contols
    let inputs = [...document.querySelectorAll('.input-box')]

    inputs.forEach(inputBox => {
        inputBox.classList.add('mb-3')

        let fg = inputBox.childNodes[0]
        fg.classList.add('form-group')

        let input = [...fg.childNodes].find(inp => inp.nodeName === 'INPUT')
        if (input) {
            input.classList.add('form-control-sm')
            input.classList.add('w-100')

            if (input.id && input.id.includes('btn')) {
                input.classList.add('text-center')
                input.classList.add('btn')
                input.classList.add('btn-primary')
            }
        }

        let label = [...fg.childNodes].find(inp => inp.nodeName === 'LABEL')
        if (label) {
            label.classList.add('me-3')
        }
    })
}

// export const portrait_landscape = (isLandscape) => {
//     const container = document.getElementById('container-preview');
//     const preview = document.getElementById('preview')
//     let ratio = (5 / 8)

//     if (!isLandscape) {
//         preview.style.width = '40%'
//         // ratio = (3 / 4)
//     } else {
//         preview.style.width = '100%'
//         ratio = (5 / 8)
//     }

//     window.addEventListener('resize', () => {
//         const preview = document.getElementById('preview')
//         const content = document.getElementById('content')

//         let newHeight = container.clientWidth * ratio
//         preview.style.height = `${newHeight}px`

//         let scale = newHeight / content.clientHeight
//         if (scale < 1) content.style.transform = `scale(${scale - 0.1})`
//     })
// }