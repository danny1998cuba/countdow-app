import axios from 'axios'
import { API_COUNTDOWN } from '../constants/api.routes'
import { generateHeader } from './headers'

export const create = async (countdown) => {
    try {
        let headers = generateHeader()
        let res = await axios.post(API_COUNTDOWN, countdown, { headers })
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const update = async (id, countdown) => {
    try {
        let headers = generateHeader()
        let res = await axios.put(`${API_COUNTDOWN}/${id}`, countdown, { headers })
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const delete_ = async (id) => {
    try {
        let headers = generateHeader()
        let res = await axios.get(`${API_COUNTDOWN}/${id}`, { headers })
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getOne = async (id) => {
    try {
        let headers = generateHeader()
        let res = await axios.get(`${API_COUNTDOWN}/${id}`, { headers })
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getAll = async () => {
    try {
        let headers = generateHeader()
        let res = await axios.get(API_COUNTDOWN, { headers })
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
