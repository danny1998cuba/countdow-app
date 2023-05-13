import axios from 'axios'
import { CHANGE_PASSWORD, PROFILE, SIGNIN, SIGNUP } from '../constants/api.routes'
import { generateHeader } from './headers'

export const signin = async ({ username, password }) => {
    try {
        let res = await axios.post(SIGNIN, { username, password })
        return res.data.token
    } catch (error) {
        throw error.response.data
    }
}

export const signup = async ({ username, email, password }) => {
    try {
        let res = await axios.post(SIGNUP, { username, email, password })
        return res.data.token
    } catch (error) {
        throw error.response.data
    }
}

export const changePassword = async ({ username }) => {
    try {
        let res = await axios.post(CHANGE_PASSWORD, { username })
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const profile = async () => {
    try {
        let headers = generateHeader()
        let res = await axios.get(PROFILE, { headers })
        return res.data
    } catch (error) {
        throw error.response.data
    }
}