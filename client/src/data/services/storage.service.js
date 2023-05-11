// Methods for LocalStorage
export const setItemLocal = (key, object) => {
    localStorage.setItem(key, JSON.stringify(object))
}

export const getItemLocal = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const removeItemLocal = (key) => {
    return localStorage.removeItem(key)
}

export const isInLocal = (key) => {
    return localStorage.getItem(key) !== null
}

// Methods for SessionStorage
export const setItemSession = (key, object) => {
    sessionStorage.setItem(key, JSON.stringify(object))
}

export const getItemSession = (key) => {
    return JSON.parse(sessionStorage.getItem(key))
}

export const isInSession = (key) => {
    return sessionStorage.getItem(key) !== null
}

export const removeItemSession = (key) => {
    return sessionStorage.removeItem(key)
}