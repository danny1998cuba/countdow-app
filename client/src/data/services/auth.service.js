import axios from 'axios'
import { API_USERS, CHANGE_PASSWORD, PROFILE, SIGNIN, SIGNUP, USER_PASSWORD } from '../constants/api.routes'
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

export const forgotPassword = async ({ username }) => {
    try {
        let res = await axios.post(CHANGE_PASSWORD, { username })
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const changePassword = async ({ password, newPassword }) => {
    try {
        let headers = generateHeader()
        let res = await axios.post(USER_PASSWORD, { password, newPassword }, { headers })
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const changeEmail = async (user, { email }) => {
    try {
        let headers = generateHeader()
        let res = await axios.put(`${API_USERS}/${user._id}`, {
            username: user.username,
            email
        }, { headers })
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const deleteUser = async (user) => {
    try {
        let headers = generateHeader()
        let res = await axios.delete(`${API_USERS}/${user._id}`, { headers })
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