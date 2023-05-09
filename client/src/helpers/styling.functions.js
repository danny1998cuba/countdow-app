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