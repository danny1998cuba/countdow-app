import axios from 'axios'
import { SIGNIN, SIGNUP } from '../constants/api/api.routes'

export const signin = async ({ username, password }) => {
    try {
        let res = await axios.post(SIGNIN, { username, password })
        return res.data.token
    } catch (error) {
        throw error.response.data
    }
}

export const signup = async ({ username, password }) => {
    try {
        let res = await axios.post(SIGNUP, { username, password })
        return res.data.token
    } catch (error) {
        throw error.response.data
    }
}